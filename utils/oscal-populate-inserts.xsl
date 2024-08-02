<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
   xmlns:xs="http://www.w3.org/2001/XMLSchema"
   xmlns:math="http://www.w3.org/2005/xpath-functions/math"
   xpath-default-namespace="http://csrc.nist.gov/ns/oscal/1.0"
   version="3.0">

   <xsl:output indent="yes"/>

   <xsl:mode on-no-match="shallow-copy"/>

   <xsl:template match="param" priority="2"/>

   <xsl:template match="part[@name=('objective','assessment')]" priority="2"/>

   <xsl:key name="cross-reference-targets" match="*[exists(@id|@uuid)]" use="(@uuid | @id) ! ('#' || .)"/>

   <xsl:key name="param-by-id" match="param" use="@id"/>

   <xsl:template match="/*">
      <xsl:copy>
         <xsl:apply-templates/>
      </xsl:copy>
   </xsl:template>
   <xsl:template match="insert">
      <xsl:apply-templates select="key('param-by-id',@id-ref)" mode="show.parameter"/>
   </xsl:template>

   <xsl:template match="link" mode="link-as-link">
      <xsl:text>[</xsl:text>
      <xsl:apply-templates select="text"/>
      <xsl:if test="not(matches(text,'\S'))" expand-text="true">
         <xsl:value-of select="@href"/>
      </xsl:if>
      <xsl:text>]({ @href })</xsl:text>
   </xsl:template>

   <xsl:template match="link[starts-with(@href,'#')]" mode="link-as-link">
      <xsl:variable name="target" select="key('cross-reference-targets',@href)"/>
      <xsl:choose>
         <xsl:when test="exists($target)">
            <xsl:apply-templates select="$target" mode="link-as-link">
               <xsl:with-param name="link" select="."/>
            </xsl:apply-templates>
         </xsl:when>
         <xsl:otherwise>
            <xsl:next-match/>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>

   <xsl:template match="*" mode="link-as-link">
      <xsl:apply-templates select="." mode="link-text"/>
   </xsl:template>

   <xsl:template match="control" mode="link-as-link" expand-text="true">
      <xsl:text>[{ prop[@name='label'][2]/@value }](../{ substring(@id, 1, 2) }/{ substring(prop[@name='sort-id']/@value, 1, 5) }#{ prop[@name='sort-id']/@value })</xsl:text>
   </xsl:template>

   <xsl:template priority="2" match="resource[empty(rlink)]" mode="link-as-link">
      <xsl:param name="link" select="()"/>
      <xsl:for-each select="$link">
         <span class="ref-label">
            <xsl:apply-templates/>
         </span>
         <xsl:if test="exists(desc | citation/text)">
            <xsl:text>: </xsl:text>
         </xsl:if>
      </xsl:for-each>
      <xsl:apply-templates select="child::desc"/>
      <xsl:apply-templates select="child::citation/text"/>
   </xsl:template>

   <xsl:template match="resource" mode="link-as-link">
      <xsl:param name="link" select="()"/>
      <a href="{ child::rlink[1]/@href }">
         <xsl:for-each select="$link[exists(text)]">
            <span class="ref-label">
               <xsl:apply-templates/>
            </span>
            <xsl:text>: </xsl:text>
         </xsl:for-each>
         <xsl:sequence>
            <xsl:apply-templates select="." mode="link-text"/>
            <xsl:on-empty expand-text="true">{ child::rlink[1]/@href }{ child::rlink[1]/@media-type ! ( ' (' || . || ')' ) }</xsl:on-empty>
         </xsl:sequence>
      </a>
   </xsl:template>

   <xsl:template match="control | part[prop/@name='label']" mode="link-text">
      <xsl:sequence>
         <xsl:value-of select="prop[@name='label']/@value"/>
         <xsl:on-empty>[Error: no 'label' property on link target]</xsl:on-empty>
      </xsl:sequence>
   </xsl:template>

   <xsl:template match="*" mode="link-text">
      <xsl:choose>
         <xsl:when test="exists(title)">
            <xsl:for-each select="title">
               <xsl:apply-templates/>
            </xsl:for-each>
         </xsl:when>
         <xsl:when test="exists(desc)">
            <xsl:for-each select="desc">
               <xsl:apply-templates/>
            </xsl:for-each>
         </xsl:when>
         <xsl:otherwise>[Error: no title on link target]</xsl:otherwise>
      </xsl:choose>
   </xsl:template>

   <xsl:template match="param" mode="show.parameter">
      <strong>
         <em>
            <xsl:text>[Assignment: </xsl:text>
            <xsl:apply-templates select="(value,label)"/>
            <xsl:text>]</xsl:text>
         </em>
      </strong>
   </xsl:template>

   <xsl:template match="param[select]" mode="show.parameter">
      <strong>
         <em>
            <xsl:text expand-text="true">[Selection</xsl:text>
            <xsl:if test="select/@how-many = 'one-or-more'">
               <xsl:text> (one or more)</xsl:text>
            </xsl:if>
            <xsl:text>: </xsl:text>
            <xsl:apply-templates select="select/choice"/>
            <xsl:text>]</xsl:text>
         </em>
      </strong>
   </xsl:template>

   <xsl:template match="prop[@name='status'][matches(@value,'Withdrawn','i')]">
      <prop xmlns="http://csrc.nist.gov/ns/oscal/1.0" name="status" value="withdrawn">
         <em>
            <xsl:text>[Withdrawn</xsl:text>
            <xsl:variable name="withdrawn-to" select="../link[@rel = ('moved-to', 'incorporated-into')]"/>
            <xsl:variable name="link-label">
               <xsl:choose>
                  <xsl:when test="empty($withdrawn-to)">.</xsl:when>
                  <xsl:when test="$withdrawn-to/@rel = 'incorporated-into'">: Incorporated into </xsl:when>
                  <xsl:otherwise>: Moved to </xsl:otherwise>
               </xsl:choose>
            </xsl:variable>
            <xsl:variable name="withdrawn-statement">
               <xsl:sequence select="$link-label"/>
               <xsl:for-each-group select="$withdrawn-to" group-by="true()">
                  <xsl:for-each select="current-group()">
                     <xsl:if test="position() gt 1">, </xsl:if>
                     <xsl:apply-templates select="." mode="link-as-link"/>
                  </xsl:for-each>
               </xsl:for-each-group>
               <xsl:for-each select="../part[@name = 'statement']/*">
                  <xsl:apply-templates/>
               </xsl:for-each>
            </xsl:variable>
            <xsl:sequence select="$withdrawn-statement"/>
            <xsl:if test="not(matches(string($withdrawn-statement), '\.\s*$'))">.</xsl:if>
            <xsl:text>]</xsl:text>
         </em>
      </prop>
   </xsl:template>

   <xsl:template match="label">
      <xsl:apply-templates/>
   </xsl:template>

   <xsl:template match="select">
      <xsl:apply-templates/>
   </xsl:template>

   <xsl:template match="select/choice">
      <xsl:text>; </xsl:text>
      <xsl:apply-templates/>
   </xsl:template>

   <xsl:template match="select/choice[1]" priority="2">
      <xsl:apply-templates/>
   </xsl:template>
</xsl:stylesheet>
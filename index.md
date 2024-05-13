---
layout:             full-width
title:              Texas A&amp;M System Cybersecurity
first-heading:      Cybersecurity
description:        Texas A&M System Cybersecurity provides a managed detection and response (MDR) service and other cybersecurity shared services to help customers optimize their cyber defense posture
banner:             true
banner-content:     Texas A&amp;M System Cybersecurity leads the System's effort to manage and reduce risk to our cyber infrastructure. We deliver resources and tools to our customers to help them ensure a secure and resilient infrastructure.
banner-bg:          /assets/images/banners/cybersecurity-header-background-full.jpg
banner-icon:        /assets/images/icons/cybersecurity-icon.svg
banner-icon-alt:    A banner icon of a padlock
---

<div class="row cards">
	{% capture card_content %}
	<p>Our managed detection and response (MDR) service helps you optimize your cyber defense posture.</p>

	<h3>Managed Detection and Response</h3>
	<p>The MDR service monitors your endpoints and network for signs of malicious activity. Cyber analysts then filter out false positives and only escalate actionable items as alerts. Clearing false positives alleviates alert fatigue and saves you time and effort reviewing potential threats.</p>

	<h3>Incident Response</h3>
	<p>We provide full-service incident response (IR) for threats identified through the MDR service. IR services can be delivered remotely or on-the-ground, depending on the incident's nature and scope.</p>
	{% endcapture %}
	{% include card.html color="card-0" title="Cyber Operations" content=card_content %}
<!--	{% include card.html color="card-0" title="Cyber Operations" read_more_url="cyber-ops" content=card_content %} -->

	{% capture card_content %}
	<p>Our managed and professional consultation services help you manage your information security program.</p>

	<h3>Cyber Risk Management</h3>
	<p>We conduct strategic analyses of open sources to identify cyber risks to your organization. Our analysts feed this information into our workflow to assist with cyber risk mitigation. Actionable items are also delivered to you for mitigation.</p>

	<h3>Information Sharing &amp; Analysis</h3>
	<p>The 19 members of the Texas A&M System form a robust information sharing and analysis organization. We also directly support the State of Texas Information Sharing & Analysis Organization (TX-ISAO).</p>

	{% endcapture %}
	{% include card.html color="card-1" title="Cyber Shared Services" content=card_content %}
<!--	{% include card.html color="card-1" title="Cyber Shared Services" read_more_url="cyber-shared-services" content=card_content %} -->
</div>

<div class="row cards">
	{% capture card_content %}
	<p>Texas A&amp;M System members and Texas public sector entities and institutions of higher education are eligible for our services. To learn more, please <a href="/contact/">contact us</a>.</p>
	{% endcapture %}
	{% include full-width-card.html color="card-2" title="For More Information" content=card_content %}
</div>

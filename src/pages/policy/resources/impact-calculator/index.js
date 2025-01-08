import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import $ from 'jquery';

const pageTitle = "Impact Calculator"

function ImpactCalculatorHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {pageTitle}
        </Heading>
      </div>
    </header>
  );
}

function ImpactCalculatorResult() {
  return (
    <div className={styles.impact_panel} id="impact_panel">
      <div className={`${styles.impact_result} impact_result`}>
        <h2>Your Results</h2>
          <div className={`${styles.impact_summary} impact_summary`}>Your results will appear here when you have answered all of the questions.</div>
      </div>
    </div>
  )
}

function ImpactCalculatorContent() {
  return (
    <article>
      <div>
        <form method="POST" id="impact_calculator">
          <div className={`${styles.impact_questions} impact_questions`}>
            <div className={`${styles.impact_question} impact_question`} id="q1">
              <div className={styles.impact_question_number}>1</div>
              <div className={styles.impact_question_content}>
                If this information resource is unavailable or compromised, my unit
                (e.g., college or division) would be unable to perform one or more of
                it’s primary functions.
              </div>
              <div className={styles.impact_question_options}>
                <fieldset>
                  <legend className="d-none">Select the best option</legend>
                  <div>
                    <input
                      type="radio"
                      name="question-1"
                      defaultValue="no"
                      id="ff-1-no"
                    />
                    <label htmlFor="ff-1-no">No</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="question-1"
                      defaultValue="yes"
                      id="ff-1-yes"
                    />
                    <label htmlFor="ff-1-yes">Yes</label>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className={`${styles.impact_question} impact_question`} id="q2">
              <div className={styles.impact_question_number}>2</div>
              <div className={styles.impact_question_content}>
                If this information resource is unavailable or compromised, it is
                possible that catastrophic harm (loss of life or serious life
                threatening injury) to individuals could occur.
              </div>
              <div className={styles.impact_question_options}>
                <fieldset>
                  <legend className="d-none">Select the best option</legend>
                  <div>
                    <input
                      type="radio"
                      name="question-2"
                      defaultValue="no"
                      id="ff-2-no"
                    />
                    <label htmlFor="ff-2-no">No</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="question-2"
                      defaultValue="yes"
                      id="ff-2-yes"
                    />
                    <label htmlFor="ff-2-yes">Yes</label>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className={`${styles.impact_question} impact_question`} id="q3">
              <div className={styles.impact_question_number}>3</div>
              <div className={styles.impact_question_content}>
                If this information resource were unavailable or compromised, my unit
                (e.g., college or division) could experience _______ financial loss as
                a result.
              </div>
              <div className={styles.impact_question_options}>
                <fieldset>
                  <legend className="d-none">Select the best option</legend>
                  <div>
                    <input
                      type="radio"
                      name="question-3"
                      defaultValue="minor"
                      id="ff-3-minor"
                    />
                    <label htmlFor="ff-3-minor">Minor</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="question-3"
                      defaultValue="significant"
                      id="ff-3-significant"
                    />
                    <label htmlFor="ff-3-significant">Significant</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="question-3"
                      defaultValue="major"
                      id="ff-3-major"
                    />
                    <label htmlFor="ff-3-major">Major</label>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className={`${styles.impact_question} impact_question`} id="q4">
              <div className={styles.impact_question_number}>4</div>
              <div className={styles.impact_question_content}>
                If this information resource were unavailable or compromised, my unit
                (e.g., college or division) could experience _______ reputational
                damage as a result.
              </div>
              <div className={styles.impact_question_options}>
                <fieldset>
                  <legend className="d-none">Select the best option</legend>
                  <div>
                    <input
                      type="radio"
                      name="question-4"
                      defaultValue="minor"
                      id="ff-4-minor"
                    />
                    <label htmlFor="ff-4-minor">Minor</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="question-4"
                      defaultValue="significant"
                      id="ff-4-significant"
                    />
                    <label htmlFor="ff-4-significant">Significant</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="question-4"
                      defaultValue="major"
                      id="ff-4-major"
                    />
                    <label htmlFor="ff-4-major">Major</label>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className={`${styles.impact_question} impact_question`} id="q5">
              <div className={styles.impact_question_number}>5</div>
              <div className={styles.impact_question_content}>
                Stores, transmits, and/or processes health records or patient data.
              </div>
              <div className={styles.impact_question_options}>
                <fieldset>
                  <legend className="d-none">Select the best option</legend>
                  <div>
                    <input
                      type="radio"
                      name="question-5"
                      defaultValue="no"
                      id="ff-5-no"
                    />
                    <label htmlFor="ff-5-no">No</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="question-5"
                      defaultValue="yes"
                      id="ff-5-yes"
                    />
                    <label htmlFor="ff-5-yes">Yes</label>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className={`${styles.impact_question} impact_question`} id="q6">
              <div className={styles.impact_question_number}>6</div>
              <div className={styles.impact_question_content}>Data Categorization</div>
              <div className={styles.impact_question_options}>
                <fieldset>
                  <legend className="d-none">Select the best option</legend>
                  <div>
                    <input
                      type="radio"
                      name="question-6"
                      defaultValue="public"
                      id="ff-6-public"
                    />
                    <label htmlFor="ff-6-public">Public</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="question-6"
                      defaultValue="controlled"
                      id="ff-6-controlled"
                    />
                    <label htmlFor="ff-6-controlled">Internal Use</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="question-6"
                      defaultValue="confidential"
                      id="ff-6-confidential"
                    />
                    <label htmlFor="ff-6-confidential">Confidential</label>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <button className="btn btn-success d-none" type="submit">
            Submit
          </button>
          <button className="btn btn-secondary" type="reset">
            Reset
          </button>
        </form>
      </div>

      <div className={styles.subsection_content}>
        <h3 id="section1-subsection1">About this calculator</h3>

        <p>All <a href="https://it.tamu.edu/policy/glossary.php#d-information-resources">information resources</a> in the state of Texas are categorized by their impact level according to <a href="https://texreg.sos.state.tx.us/public/readtac$ext.TacPage?sl=R&amp;app=9&amp;p_dir=&amp;p_rloc=&amp;p_tloc=&amp;p_ploc=&amp;pg=1&amp;p_tac=&amp;ti=1&amp;pt=10&amp;ch=202&amp;rl=1">Texas Administrative Code, &#167;202.1</a>. This impact level affects how the resource is managed, how budgets are prioritized, and guides business decisions regarding backup and recovery efforts. From an information security perspective, the impact level helps us assess the risk that is associated with a given resource.<br/><br/>The definitions of impact level that are found in TAC 202 is a federal standard that comes from the NIST Information Technology Library publication <a href="https://csrc.nist.gov/publications/detail/fips/199/final">FIPS 199</a>. These impact levels are used in combination with the Texas A&amp;M <a href="https://it.tamu.edu/policy/it-policy/controls-catalog/index.php">Information Security Controls Catalog</a> to selectively apply certain controls to resources at different impact levels. Please check the Applicability section inside each control for more information.</p>
      </div>
    </article>
  );
}

function ImpactCalculatorJavaScript() {
  $(document).ready( function () {
    var impact_calculator = {
      "questions": [
        { "content": "If this information resource is unavailable or compromised, my unit (e.g., college or division) would be unable to perform one or more of it's primary functions.",
          "options": {
            "no": "No",
            "yes": "Yes"
          },
          "auto_high": "yes"
        },
        { "content": "If this information resource is unavailable or compromised, it is possible that catastrophic harm (loss of life or serious life threatening injury) to individuals could occur.",
          "options": {
            "no": "No",
            "yes": "Yes"
          },
          "auto_high":"yes"
        },
        { "content": "If this information resource were unavailable or compromised, my unit (e.g., college or division) could experience _______ financial loss as a result.",
          "options": {
            "minor": "Minor",
            "significant": "Significant",
            "major": "Major"
          },
          "math": true
        },
        { "content": "If this information resource were unavailable or compromised, my unit (e.g., college or division) could experience _______ reputational damage as a result.",
          "options": {
            "minor": "Minor",
            "significant": "Significant",
            "major": "Major"
          },
          "math": true
        },
        { "content": "Stores, transmits, and\/or processes health records or patient data.",
          "options": {
            "no": "No",
            "yes": "Yes"
          },
          "math": true,
          "value": 4
        },
        { "content": "Data Categorization",
          "options": {
            "public": "Public",
            "controlled": "Internal Use",
            "confidential": "Confidential"
          },
          "math": true
        }],
        "results": {
          "high": {
            "label": "High",
            "label_full": "High Impact Information Resource",
            "definition_id": "01b85cc3eda23bafbacc7a44b607bdafa7e28782",
            "summary": "Your information resource is likely considered <a href=\"https:\/\/it.tamu.edu\/policy\/glossary.php#d-high-impact-information-resources\" target=\"_blank\">high impact<\/a> to Texas A&M. Some IT policies change depending on the impact level of your resource; high impact resources in particular have special considerations. See the information security <a href=\"http:\/\/u.tamu.edu\/controls-catalog\" target=\"_blank\">controls catalog<\/a> for more details.",
            "definition":"<p>Information Resources whose loss of confidentiality, integrity, or availability could be expected to have a severe or catastrophic adverse effect on organizational operations, organizational assets, or individuals. Such an event could:<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(A) cause a severe degradation in or loss of mission capability to an extent and duration that the organization is not able to perform one or more of its primary functions;<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(B) result in major damage to organizational assets;<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(C) result in major financial loss; or<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(D) result in severe or catastrophic harm to individuals involving loss of life or serious life threatening injuries.<\/p>",
            "definition_url":"\/policy\/glossary.php#d-high-impact-information-resources"
          },
          "moderate": {
            "label": "Moderate",
            "label_full": "Moderate Impact Information Resource",
            "definition_id": "4ec853cab56a7b51e5f02b5c7c4760c7b8ff621f",
            "summary": "Your information resource is likely considered <a href=\"https:\/\/it.tamu.edu\/policy\/glossary.php#d-moderate-impact-information-resources\" target=\"_blank\">moderate impact<\/a> to Texas A&M. Some IT policies change depending on the impact level of your resource; see the information security <a href=\"http:\/\/u.tamu.edu\/controls-catalog\" target=\"_blank\">controls catalog<\/a> for more details.",
            "definition":"<p>Information Resources whose loss of confidentiality, integrity, or availability could be expected to have a serious adverse effect on organizational operations, organizational assets, or individuals. Such an event could:<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(A) cause a significant degradation in mission capability to an extent and duration that the organization is able to perform its primary functions, but the effectiveness of the functions is significantly reduced;<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(B) result in significant damage to organizational assets;<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(C) result in significant financial loss; or<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(D) result in significant harm to individuals that does not involve loss of life or serious life threatening injuries.<\/p>",
            "definition_url":"\/policy\/glossary.php#d-moderate-impact-information-resources"
          },
          "low": {
            "label": "Low",
            "label_full": "",
            "definition_id": "75f7106de69a0623fed6f4feff22abfa5999d795",
            "summary": "Your information resource is likely considered <a href=\"https:\/\/it.tamu.edu\/policy\/glossary.php#d-low-impact-information-resources\" target=\"_blank\">low impact<\/a> to Texas A&M. Some IT policies change depending on the impact level of your resource; see the information security <a href=\"http:\/\/u.tamu.edu\/controls-catalog\" target=\"_blank\">controls catalog<\/a> for more details.",
            "definition":"<p>Information Resources whose loss of confidentiality, integrity, or availability could be expected to have a limited adverse effect on organizational operations, organizational assets, or individuals. Such an event could:<\/p>\r\n<p>&nbsp; &nbsp; (A) cause a degradation in mission capability to an extent and duration that the organization is able to perform its primary functions, but the effectiveness of the functions is noticeably reduced;&nbsp;<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(B) result in minor damage to organizational assets;&nbsp;<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(C) result in minor financial loss; or&nbsp;<\/p>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;(D) result in minor harm to individuals.<\/p>",
            "definition_url":"\/policy\/glossary.php#d-low-impact-information-resources"
          } 
        } 
      }

    var $impact_form = $("#impact_calculator");
    var $impact_panel = $("#impact_panel");
    var $impact_result = $impact_panel.find(".impact_result");
      
    var $h2 = $impact_result.find("h2");
        $h2.data("default-content", $h2.html());
    var $summary = $impact_result.find(".impact_summary");
        $summary.data("default-content", $summary.html());
    
    var recalculate_score = function() {
      var total_score = 0;
      var total_answered = 0;
      
      for (var q in impact_calculator.questions) {
        var qi = parseInt(q)+1;
        var qq = impact_calculator.questions[q];
        
        var item_score = 0;
        var is_mathed = qq.math || false;
        var has_auto = qq.auto_high || false;
        
        var $selected = $("[name='question-"+qi+"']:checked");
        var selected_index = false;
        var selected_value = ($selected.length) ? $selected.val() : false;
        
        if (selected_value) {
          total_answered++;
          
          if (has_auto) {
            if (selected_value === has_auto) {
              total_score = "high";
            }
          }
          
          if (total_score === "high") {
            continue;
          }

          if (is_mathed) {
            selected_index = 0;

            for (var o in qq.options) {
              if (o === selected_value) {
                break;
              }

              selected_index++;
            }

            if (typeof qq.value !== "undefined" && selected_index === 1) {
              item_score = qq.value;
            } else {
              item_score = Math.pow(2, selected_index);
            }
            console.log(item_score);
            
            total_score += item_score;
          }
        }
      }
      
      var is_answered = false;
      var is_completed = false;
      
      if (total_answered === 6) {
        is_completed = true;
      }
      if (total_score === "high" || is_completed) {
        is_answered = true;
      }
      
      console.log(total_answered, is_answered, is_completed);
      
      $impact_result.removeClass("alert-warning alert-success alert-danger alert-info")
      
      var total_rating = "";
      var alert_class = null;
      var results = null;
        
      if (is_answered) {
        $impact_panel.toggleClass("impact_answered", is_answered).toggleClass("impact_completed", is_completed);

        if (total_score < 6) {
          total_rating = "low";
        } else if (total_score < 11) {
          total_rating = "moderate";
        } else {
          total_rating = "high";
        }
      }
      
      switch (total_rating) {
        case "":
          alert_class = "alert-info";
          results = "default";
          break;
        case "high":
          alert_class = alert_class || "alert-danger";
        case "moderate":
          alert_class = alert_class || "alert-warning";
        case "low":
          alert_class = alert_class || "alert-success";
          results = impact_calculator.results[total_rating];
          break;
      }

      $impact_result.addClass(alert_class);
      
      if (results === "default") {
        $h2.html($h2.data("default-content"));
        $h2.removeAttr("title");

        $summary.html($summary.data("default-content"));
      } else {
        if (typeof results.definition_url !== "undefined") {
          $h2.html('<a href="'+results.definition_url+'" data-tippy-content="'+results.definition+'" target="_blank">'+results.label+'</a>');
        } else {
          $h2.html(results.label);
        }
        
        $h2.attr("title", results.label_full || results.label);
        
        $summary.html(results.summary);
      }

  //    $impact_result.find("span").html("[testing] "+total_answered+" ans. w/ "+total_score+" total score");
    };
    
    $impact_form.find("input[type='radio']").on("change", function() {
      recalculate_score();
    });
    
    $impact_form.find("input[type='radio']").on("focus", function() {
      if ($(this).parents(".impact_questions").hasClass("complete")) {
        return;
      }
      
      var $parent = $(this).parents(".impact_question");
      var $prev = $parent.prev(".impact_question");
      
      var target;
      
      if ($prev.length) {
        var $prev_selected = $prev.find("input[type='radio']:checked");
        
        if ($prev_selected.length === 0) {
          $prev.find("input[type='radio']")[0].focus();
          return;
        }
      }
      
      if (!target) {
        target = $parent[0].id;
      }
      
      location.hash = target;
    });
    
    $impact_form.find("input[type='radio']").on("mouseup", function(e) {
      $(this).data("clicked", true);
    });
    
    $impact_form.find("input[type='radio'] + label").on("mouseup", function(e) {
      $(this).siblings("input").data("clicked", true);
    });
    
    $impact_form.find("input[type='radio']").on("keydown", function(e) {
      if ([9, 32].indexOf(e.keyCode) !== -1) {
        $(this).data("clicked", true);
        
        if (e.keyCode === 9 && $(this).is(":checked")) {
          console.log(this);
          $(this).parents(".impact_question").addClass("complete");
        }
      } else {
        $(this).data("clicked", false);
      }
    });
    
    $impact_form.on("submit", function(e) {
      e.preventDefault();
      return false;
    });
    
    $impact_form.on("reset", function(e) {
      $impact_form.find(".impact_questions").removeClass("complete");
      $impact_form.find(".impact_question").removeClass("complete");
      
      $("#q1").find("input[type='radio']")[0].focus();
      
      setTimeout(recalculate_score, 125);
    });
    
    $impact_form.find("input[type='radio']").on("click", function(e) {
      if ($(this).parents(".impact_questions").hasClass("complete")) {
        return;
      }
      
      if ($(this).data("clicked") === true) {
        var $parent = $(this).parents(".impact_question");
            $parent.addClass("complete");
            
        var $next = $parent.next(".impact_question");

        if ($next.length) {
          var target = $next[0].id;

          location.hash = target;
        } else {
          $(this).parents(".impact_questions").addClass("complete");
        }
      }
    });
    
    if(history.pushState && !location.hash) {
      history.pushState(null, null, '#q1');
      $("#q1").addClass("active");
    }
    else {
      location.hash = '#q1';
    }

    window.onhashchange = function (e) {
      e.preventDefault();

      if (location.hash !== "#q1") {
        $(".impact_question").removeClass("active");
      }

      return false;
    };
    
    recalculate_score();
  });
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={pageTitle}
      description="Description will go into a meta tag in <head />">
      <ImpactCalculatorHeader />
      <main>
        <Grid fluid className={styles.impact_container}>
          <Row>
            <Col lg={3}>
              <ImpactCalculatorResult />
            </Col>
            <Col lg={9}>
              <ImpactCalculatorContent />
              <ImpactCalculatorJavaScript />
            </Col>
          </Row>
        </Grid>
      </main>
    </Layout>
  );
}

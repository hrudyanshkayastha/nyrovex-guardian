from datetime import datetime


def generate_report(
    incident_id,
    incident,
    threat_findings,
    risk_findings,
    compliance_findings,
    forensics_findings,
    overall_confidence,
    timeline
):

    return f"""
==================================================
NYROVEX GUARDIAN EXECUTIVE INCIDENT REPORT
==================================================

Generated:
{datetime.utcnow()}

Incident ID:
{incident_id}

Incident:
{incident}

--------------------------------------------------
INVESTIGATION TIMELINE
--------------------------------------------------

{timeline}

--------------------------------------------------
THREAT ASSESSMENT
--------------------------------------------------

{threat_findings}

--------------------------------------------------
RISK ASSESSMENT
--------------------------------------------------

{risk_findings}

--------------------------------------------------
COMPLIANCE ASSESSMENT
--------------------------------------------------

{compliance_findings}

--------------------------------------------------
FORENSICS ASSESSMENT
--------------------------------------------------

{forensics_findings}

--------------------------------------------------
RECOMMENDED ACTIONS
--------------------------------------------------

1. Isolate affected host
2. Reset compromised credentials
3. Preserve forensic evidence
4. Review outbound connections
5. Notify compliance team

--------------------------------------------------
OVERALL CONFIDENCE
--------------------------------------------------

{overall_confidence}

==================================================
END OF REPORT
==================================================
"""

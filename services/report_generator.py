from datetime import datetime


def generate_report(
    incident,
    threat_findings,
    risk_findings,
    compliance_findings
):
    return f"""
==================================================
NYROVEX GUARDIAN EXECUTIVE INCIDENT REPORT
==================================================

Generated:
{datetime.utcnow()}

Incident:
{incident}

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
RECOMMENDED ACTIONS
--------------------------------------------------

1. Isolate affected host
2. Reset compromised credentials
3. Preserve forensic evidence
4. Review outbound connections
5. Notify compliance team

==================================================
END OF REPORT
==================================================
"""

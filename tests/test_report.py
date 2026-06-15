import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

from services.report_generator import generate_report


report = generate_report(
    incident_id="INC-2026-001",

    incident="Credential Dumping on FINANCE-PC-22",

    threat_findings="""
Severity: High

MITRE:
- T1003 Credential Dumping
- T1041 Exfiltration

Confidence: 85
""",

    risk_findings="""
Risk Score: 85

Business Impact: Critical

Priority: P1

Confidence: 90
""",

    compliance_findings="""
GDPR Impact: Yes

Reporting Required: Yes

Audit Required: Yes

Confidence: 85
""",

    overall_confidence="87%",

    timeline="""
10:20 Alert Received
10:21 Commander Activated
10:22 Threat Analysis Completed
10:23 Risk Assessment Completed
10:24 Compliance Review Completed
10:25 Report Generated
"""
)

print(report)

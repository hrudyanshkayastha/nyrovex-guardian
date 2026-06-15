import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

from services.report_generator import generate_report

report = generate_report(
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
"""
)

print(report)

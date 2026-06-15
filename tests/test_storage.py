from services.report_storage import save_report

report = """
TEST INCIDENT REPORT

Severity: High
Risk Score: 85
"""

saved_path = save_report(report)

print("Saved:", saved_path)

const attackScenarios = {

    "Credential Dumping": {

        events: [
            "Alert Received",
            "Commander Activated",
            "Digital Forensics Started",
            "Mimikatz Detected",
            "IOC Extracted",
            "MITRE T1003 Mapped",
            "Risk Assessment Completed",
            "Executive Report Generated"
        ],

        report: `
THREAT ASSESSMENT
Severity: High

RISK ASSESSMENT
Risk Score: 85
Priority: P1

COMPLIANCE
GDPR Impact: Yes

FORENSICS
Import-Module Mimikatz
185.199.110.153
T1003 Credential Dumping
`,

        evidence: `
IP: 185.199.110.153
Command: Import-Module Mimikatz
MITRE: T1003
`
    },

    "Ransomware": {

        events: [
            "Alert Received",
            "Commander Activated",
            "Threat Agent Started",
            "Mass File Encryption Detected",
            "T1486 Identified",
            "Risk Assessment Completed",
            "Compliance Review",
            "Executive Report Generated"
        ],

        report: `
THREAT ASSESSMENT
Severity: Critical

RISK ASSESSMENT
Risk Score: 95

COMPLIANCE
Notification Required

FORENSICS
Encrypted Files Found
Ransom Note Found
MITRE T1486
`,

        evidence: `
MITRE: T1486
Encrypted Files
Ransom Note Found
`
    },

    "Data Exfiltration": {

        events: [
            "Alert Received",
            "Commander Activated",
            "Threat Agent Started",
            "Outbound Transfer Detected",
            "Sensitive Data Identified",
            "IOC Extracted",
            "Compliance Review",
            "Executive Report Generated"
        ],

        report: `
THREAT ASSESSMENT
Severity: Critical

RISK ASSESSMENT
Risk Score: 90

COMPLIANCE
Potential GDPR Violation

FORENSICS
Large External Transfer
Sensitive Data Exposure
`,

        evidence: `
External Connection
Large Data Upload
Possible Exfiltration
`
    }
};

let currentTimer = null;

function resetAgents() {

    document.getElementById("commander").innerHTML =
        "🟢 Commander Agent";

    document.getElementById("threat").innerHTML =
        "🟢 Threat Agent";

    document.getElementById("risk").innerHTML =
        "🟢 Risk Agent";

    document.getElementById("compliance").innerHTML =
        "🟢 Compliance Agent";

    document.getElementById("forensics").innerHTML =
        "🟢 Digital Forensics Agent";
}

function activateAgent(id, name) {

    document.getElementById(id).innerHTML =
        "🟡 " + name + " Working";
}

function simulateAttack() {

    resetAgents();

    const attack =
        document.getElementById("attack-type").value;

    const scenario =
        attackScenarios[attack];

    const feed =
        document.getElementById("incident-feed");

    feed.innerHTML = "";

    document.getElementById(
        "report-content"
    ).innerText = "";

    document.getElementById(
        "evidence-content"
    ).innerText = "";

    let index = 0;

    if (currentTimer) {

        clearInterval(currentTimer);
    }

    currentTimer = setInterval(() => {

        if (index === 0)
            activateAgent(
                "commander",
                "Commander Agent"
            );

        if (index === 2)
            activateAgent(
                "forensics",
                "Digital Forensics Agent"
            );

        if (index === 4)
            activateAgent(
                "threat",
                "Threat Agent"
            );

        if (index === 5)
            activateAgent(
                "risk",
                "Risk Agent"
            );

        if (index === 6)
            activateAgent(
                "compliance",
                "Compliance Agent"
            );

        if (index >= scenario.events.length) {

            clearInterval(currentTimer);

            document.getElementById(
                "report-content"
            ).innerText = scenario.report;

            document.getElementById(
                "evidence-content"
            ).innerText = scenario.evidence;

            return;
        }

        const div =
            document.createElement("div");

        div.className = "feed-event";

        div.innerHTML = `
            <div class="timestamp">
                ${new Date().toLocaleTimeString()}
            </div>

            <div>
                ${scenario.events[index]}
            </div>
        `;

        feed.prepend(div);

        index++;

    }, 1500);
}

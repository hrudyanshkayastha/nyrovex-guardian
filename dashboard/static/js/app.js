
function pad(n){ return n.toString().padStart(2,'0'); }
function tick(){
  const n = new Date();
  const s = pad(n.getUTCHours())+':'+pad(n.getUTCMinutes())+':'+pad(n.getUTCSeconds())+' UTC';
  document.getElementById('ng-clock').textContent = s;
  document.getElementById('ng-footer-time').textContent = 'Session: '+s;
}
tick(); setInterval(tick, 1000);
const scenarioData = {


    "Credential Dumping": {

        threat: 87,

        iocs: [
            "185.199.110.153",
            "Import-Module Mimikatz",
            "T1003 Credential Dumping"
        ],

        evidence: [
            "lsass.dmp",
            "mimikatz.log",
            "powershell_history.txt"
       ],

        terminal: [
            "[COMMANDER] Incident received",
            "[FORENSICS] Mimikatz detected",
            "[THREAT] Credential theft confirmed",
            "[RISK] Threat score 87 assigned"
        ],

        timeline: [
            "14:02 Mimikatz detected",
            "14:03 LSASS dump discovered",
            "14:04 Credential theft confirmed",
            "14:05 MITRE T1003 mapped",
            "14:07 Endpoint isolated"
        ],

        mitre: [
            {
                tactic: "Credential Access",
                score: 8,
                color: "#f85149"
            },
            {
                tactic: "Execution",
                score: 7,
                color: "#e3b341"
            },
            {
                tactic: "Defense Evasion",
                score: 5,
                color: "#58a6ff"
            }
        ]
    },

    "Ransomware Deploy": {

        threat: 95,

        iocs: [
            "ransom_note.txt",
            "Encrypted Files",
            "T1486"
        ],

        evidence: [
            "ransom_note.txt",
            "encrypted_file_list.csv",
            "lockbit_payload.bin"
       ],

        terminal: [
            "[COMMANDER] Incident received",
            "[THREAT] Mass encryption detected",
            "[FORENSICS] LockBit identified",
            "[RISK] Threat score 95 assigned"
        ],
         
        timeline: [
            "13:01 Encryption activity detected",
            "13:02 LockBit identified",
            "13:03 File system impact confirmed",
            "13:05 MITRE T1486 mapped",
            "13:07 Host isolated"
       ],

        mitre: [
            {
                tactic: "Impact",
                score: 10,
                color: "#f85149"
            },
            {
                tactic: "Execution",
                score: 8,
                color: "#e3b341"
            },
            {
                tactic: "Persistence",
                score: 6,
                color: "#58a6ff"
            }
        ]
    },

    "Data Exfiltration": {

        threat: 90,

        iocs: [
            "DNS Tunnel",
            "External Connection",
            "T1048"
        ],

        evidence: [
            "dns_capture.pcap",
            "outbound_transfer.log",
            "beacon_analysis.json"
       ],

        terminal: [
            "[COMMANDER] Incident received",
            "[THREAT] DNS tunnel detected",
            "[FORENSICS] Exfiltration confirmed",
            "[RISK] Threat score 90 assigned"
        ],

        timeline: [
            "15:10 DNS beacon detected",
            "15:11 Suspicious outbound traffic",
            "15:13 Data staging identified",
            "15:15 MITRE T1048 mapped",
            "15:17 Transfer blocked"
       ],

        mitre: [
            {
                tactic: "Exfiltration",
                score: 10,
                color: "#f85149"
            },
            {
                tactic: "Command & Control",
                score: 7,
                color: "#e3b341"
            },
            {
                tactic: "Collection",
                score: 5,
                color: "#58a6ff"
            }
        ]
    }

};
const termLines = [
  {cls:'t-info', txt:'[COMMANDER] Monitoring all agent channels...'},
  {cls:'t-warn', txt:'[THREAT] Anomalous process tree detected'},
  {cls:'t-err',  txt:'[FORENSICS] New IOC extracted: 10.0.0.55'},
  {cls:'t-ok',   txt:'[RISK] Threat score updated: 87 → 89'},
  {cls:'t-info', txt:'[COMPLIANCE] Audit log snapshot saved'},
  {cls:'t-warn', txt:'[THREAT] DNS beacon interval: 30s'},
  {cls:'t-info', txt:'[FORENSICS] MITRE T1059.003 confirmed'},
  {cls:'t-ok',   txt:'[COMMANDER] Agent sync complete'},
];
let ti = 0;
function addTermLine(){
  const t = document.getElementById('terminal');
  if(!t) return;
  const items = t.querySelectorAll('.ng-terminal-line');
  const caret = items[items.length - 1];
  const l = termLines[ti % termLines.length]; ti++;
  const d = document.createElement('div');
  d.className = 'ng-terminal-line ' + l.cls;
  d.textContent = l.txt;
  t.insertBefore(d, caret);
  if(t.querySelectorAll('.ng-terminal-line').length > 14){
    t.removeChild(t.querySelector('.ng-terminal-line:not(:last-child)'));
  }
}
setInterval(addTermLine, 3200);

function triggerAlert(){
  const m = document.getElementById('m-incidents');
  m.textContent = parseInt(m.textContent) + 1;
  const b = document.getElementById('inc-badge');
  b.textContent = parseInt(b.textContent) + 1;
  const mi = document.getElementById('m-iocs');
  mi.textContent = parseInt(mi.textContent) + 3;
  const t = document.getElementById('terminal');
  const items = t.querySelectorAll('.ng-terminal-line');
  const caret = items[items.length - 1];
  const d = document.createElement('div');
  d.className = 'ng-terminal-line t-err';
  d.textContent = '[COMMANDER] ⚠ SIMULATED ATTACK INJECTED — spawning agents';
  t.insertBefore(d, caret);
}

function runScenario(name, id){

    const scenario =
        scenarioData[name];
    document.getElementById(
        "current-incident"
    ).innerText =
        "Current: " + name;

    if(!scenario)
        return;

     document
     .querySelectorAll(".ng-incident-item")
     .forEach(item=>{
         item.classList.remove("incident-active");
     });

     if(id){
         document
         .getElementById(id)
         .classList
         .add("incident-active");
     }

    // Threat Score

    document.getElementById(
        "m-threat"
    ).innerText =
        scenario.threat;

    // IOC Panel

    const iocPanel =
        document.getElementById(
            "ioc-list"
        );

    iocPanel.innerHTML = "";

    scenario.iocs.forEach(

        ioc => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "ng-ioc-item";

            div.innerHTML =
                `<span>${ioc}</span>`;

            iocPanel.appendChild(
                div
            );
        }
    );

     // Evidence Locker

     const evidencePanel =
         document.getElementById(
             "evidence-locker"
     );

     if(evidencePanel){

         evidencePanel.innerHTML = "";

         scenario.evidence.forEach(
             item => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "ng-evidence-item";

            div.innerText =
                item;

            evidencePanel.appendChild(
                div
            );
        }
    );
}

    // Timeline

const timelinePanel =
    document.getElementById(
        "timeline-panel"
    );

if(timelinePanel){

    timelinePanel.innerHTML = "";

    scenario.timeline.forEach(
        item => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "ng-timeline-item";

            div.innerText =
                item;

            timelinePanel.appendChild(
                div
            );
        }
    );
}


    // Terminal

    const terminal =
        document.getElementById(
            "terminal"
        );

    terminal.innerHTML = "";

    scenario.terminal.forEach(
        line => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "ng-terminal-line";

            div.innerText =
                line;

            terminal.appendChild(
                div
            );
        }
    );

    // MITRE Panel

const mitrePanel =
    document.getElementById(
        "mitre-panel"
    );

mitrePanel.innerHTML = "";

scenario.mitre.forEach(
    item => {

        const row =
            document.createElement(
                "div"
            );

        row.className =
            "ng-mitre-row";

        row.innerHTML = `
            <span class="ng-mitre-tactic">
                ${item.tactic}
            </span>

            <div class="ng-mitre-bar-wrap">
                <div
                    class="ng-mitre-bar"
                    style="
                        width:${item.score * 10}%;
                        background:${item.color};
                    ">
                </div>
            </div>

            <span class="ng-mitre-score">
                ${item.score}
            </span>
        `;

        mitrePanel.appendChild(
            row
        );
    }
);

    // Status Badge

    document.getElementById(
        "sim-status"
    ).innerText =
        "RUNNING";

    setTimeout(() => {

        document.getElementById(
            "sim-status"
        ).innerText =
            "COMPLETE";

    }, 2000);

    }

function loadScenario(name,id){

    console.log("Loading:", name);

    runScenario(name,id);
}
function generateReport(){

    const incident =
        document.getElementById(
            "current-incident"
        ).innerText;

    const threat =
        document.getElementById(
            "m-threat"
        ).innerText;

    const iocs =
        Array.from(
            document.querySelectorAll(
                "#ioc-list .ng-ioc-item"
            )
        )
        .map(x => x.innerText)
        .join("\n");

const evidence =
    Array.from(
        document.querySelectorAll(
            "#evidence-locker .ng-evidence-item"
        )
    )
    .map(x => x.innerText)
    .join("\n");

const mitre =
    Array.from(
        document.querySelectorAll(
            ".ng-mitre-tactic"
        )
    )
    .map(x => x.innerText)
    .join("\n");

const report = `
NYROVEX EXECUTIVE INCIDENT REPORT
================================

Incident:
${incident}

Threat Score:
${threat}

Generated:
${new Date().toISOString()}

MITRE ATT&CK Mapping:
${mitre}

Evidence Collected:
${evidence}

Indicators of Compromise:
${iocs}

Response Status:
ALCDP-X Containment Executed

Platform:
Nyrovex Guardian SOC
`;

    const blob =
        new Blob(
            [report],
            {type:"text/plain"}
        );

    const a =
        document.createElement("a");

    a.href =
        URL.createObjectURL(blob);

    a.download =
        "incident_report.txt";

    a.click();
}
function executeALCDPAction(){

    const terminal =
        document.getElementById(
            "terminal"
        );

    const actions = [

        "[ALCDP-X] Host isolated",

        "[ALCDP-X] IOC blocked",

        "[ALCDP-X] User account disabled",

        "[ALCDP-X] Firewall rules updated",

        "[ALCDP-X] Containment complete"
    ];

    actions.forEach(
        msg => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "ng-terminal-line t-ok";

            div.innerText =
                msg;

            terminal.appendChild(
                div
            );
        }
    );

    console.log(
        "ALCDP-X executed"
    );
}

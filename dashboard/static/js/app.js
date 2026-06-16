
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
        terminal: [
            "[COMMANDER] Incident received",
            "[FORENSICS] Mimikatz detected",
            "[THREAT] Credential theft confirmed",
            "[RISK] Threat score 87 assigned"
        ]
    },

    "Ransomware": {
        threat: 95,
        iocs: [
            "ransom_note.txt",
            "Encrypted Files",
            "T1486"
        ],
        terminal: [
            "[COMMANDER] Incident received",
            "[THREAT] Mass encryption detected",
            "[FORENSICS] LockBit identified",
            "[RISK] Threat score 95 assigned"
        ]
    },

    "Data Exfiltration": {
        threat: 90,
        iocs: [
            "DNS Tunnel",
            "External Connection",
            "T1048"
        ],
        terminal: [
            "[COMMANDER] Incident received",
            "[THREAT] DNS tunnel detected",
            "[FORENSICS] Exfiltration confirmed",
            "[RISK] Threat score 90 assigned"
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

    if(!scenario)
        return;

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

    console.log(
        "Scenario executed:",
        name
    );
}
function loadScenario(name){

    console.log("Loading:", name);

    runScenario(name);
}

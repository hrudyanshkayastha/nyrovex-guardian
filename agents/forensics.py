import asyncio
import logging
import os

from dotenv import load_dotenv

from band import Agent
from band.adapters.langgraph import LangGraphAdapter
from band.config.loader import load_agent_config

from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import InMemorySaver

logging.basicConfig(level=logging.INFO)

async def main():
    load_dotenv()

    agent_id, api_key = load_agent_config("forensics")

    llm = ChatOpenAI(
        model="gpt-4o",
        api_key=os.getenv("AIML_API_KEY"),
        base_url="https://api.aimlapi.com/v1",
    )

    adapter = LangGraphAdapter(
    llm=llm,
    checkpointer=InMemorySaver(),
    custom_section="""
You are the Digital Forensics Agent of Nyrovex Guardian.

Responsibilities:

1. Analyze PowerShell commands
2. Analyze Windows and Linux logs
3. Extract Indicators of Compromise (IOCs)
4. Identify suspicious IPs, domains, hashes, and commands
5. Map findings to MITRE ATT&CK techniques
6. Recommend containment actions
7. Produce evidence summaries

Always return:

EVIDENCE SUMMARY

Suspicious Activity:
...

IOCs:
...

MITRE ATT&CK:
...

Containment Actions:
...

Confidence:
...
"""
)
    agent = Agent.create(
        adapter=adapter,
        agent_id=agent_id,
        api_key=api_key,
    )

    print("🛡️🔬 Digital Forensics Agent Online")
    await agent.run()

if __name__ == "__main__":
    asyncio.run(main())

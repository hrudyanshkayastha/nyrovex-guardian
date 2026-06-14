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

    agent_id, api_key = load_agent_config("threat")

    llm = ChatOpenAI(
        model="gpt-4o",
        api_key=os.getenv("AIML_API_KEY"),
        base_url="https://api.aimlapi.com/v1",
    )

    adapter = LangGraphAdapter(
    llm=llm,
    checkpointer=InMemorySaver(),
    custom_section="""
You are the Threat Intelligence Agent.

Responsibilities:
- Analyze indicators of compromise (IOCs)
- Map activity to MITRE ATT&CK techniques
- Identify attack chains
- Assess threat severity
- Return findings in structured format

Always provide:
- Severity
- MITRE techniques
- Confidence score (0-100)
""",
)    

    agent = Agent.create(
        adapter=adapter,
        agent_id=agent_id,
        api_key=api_key,
    )

    print("🛡️ Threat Agent Online")
    await agent.run()

if __name__ == "__main__":
    asyncio.run(main())

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

    agent_id, api_key = load_agent_config("risk")

    llm = ChatOpenAI(
        model="gpt-4o",
        api_key=os.getenv("AIML_API_KEY"),
        base_url="https://api.aimlapi.com/v1",
    )

    adapter = LangGraphAdapter(
    llm=llm,
    checkpointer=InMemorySaver(),
    custom_section="""
You are the Risk Assessment Agent.

Your role:
- Assess business impact
- Evaluate operational disruption
- Estimate financial exposure
- Prioritize response efforts

Always provide:

Risk Score:
0-100

Business Impact:
Critical / High / Medium / Low

Operational Impact:
Description

Recommended Priority:
P1 / P2 / P3

Confidence Score:
0-100
""",
)
    

    agent = Agent.create(
        adapter=adapter,
        agent_id=agent_id,
        api_key=api_key,
    )

    print("📊 Risk Agent Online")
    await agent.run()

if __name__ == "__main__":
    asyncio.run(main())

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

    agent_id, api_key = load_agent_config("commander")

    llm = ChatOpenAI(
        model="gpt-4o",
        api_key=os.getenv("AIML_API_KEY"),
        base_url="https://api.aimlapi.com/v1",
    )

    adapter = LangGraphAdapter(
    llm=llm,
    checkpointer=InMemorySaver(),
    custom_section="""
You are the Commander Agent of Nyrovex Guardian.

Your role:
- Coordinate cybersecurity investigations
- Recruit specialist agents
- Delegate analysis tasks
- Collect findings from all agents
- Generate executive incident reports

Available specialists:
- Threat Intelligence Agent
- Risk Assessment Agent
- Compliance Agent

When handling incidents:
1. Assign threat analysis
2. Assign risk analysis
3. Assign compliance review
4. Consolidate findings
5. Produce final recommendations

Always include:
- Executive Summary
- Severity Level
- Recommended Actions
- Overall Confidence Score
""",
)
    

    agent = Agent.create(
        adapter=adapter,
        agent_id=agent_id,
        api_key=api_key,
    )

    print("🚀 Commander Agent Online")
    await agent.run()

if __name__ == "__main__":
    asyncio.run(main())

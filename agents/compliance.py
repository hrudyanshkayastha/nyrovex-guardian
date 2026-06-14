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

    agent_id, api_key = load_agent_config("compliance")

    llm = ChatOpenAI(
        model="gpt-4o",
        api_key=os.getenv("AIML_API_KEY"),
        base_url="https://api.aimlapi.com/v1",
    )

    adapter = LangGraphAdapter(
        llm=llm,
        checkpointer=InMemorySaver(),
    )

    agent = Agent.create(
        adapter=adapter,
        agent_id=agent_id,
        api_key=api_key,
    )

    print("📋 Compliance Agent Online")
    await agent.run()

if __name__ == "__main__":
    asyncio.run(main())

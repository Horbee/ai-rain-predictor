from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Measurement(SQLModel, table=True):
    __tablename__ = "measurements"

    id: Optional[int] = Field(default=None, primary_key=True)
    temperature: float = Field(nullable=False)
    humidity: float = Field(nullable=False)
    pressure: float = Field(nullable=False)
    created_at: Optional[datetime] = Field(default=datetime.now())

from sqlalchemy import Column, Integer, String, Float

from app.entities.database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)
    price_combo = Column(Float)

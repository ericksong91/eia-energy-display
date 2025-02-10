"""Add avg_price to Period table

Revision ID: 6209c9c08d2d
Revises: c3a20eff5256
Create Date: 2025-02-07 17:23:16.122261

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6209c9c08d2d'
down_revision = 'c3a20eff5256'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('periods', schema=None) as batch_op:
        batch_op.add_column(sa.Column('avg_price', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('periods', schema=None) as batch_op:
        batch_op.drop_column('avg_price')

    # ### end Alembic commands ###

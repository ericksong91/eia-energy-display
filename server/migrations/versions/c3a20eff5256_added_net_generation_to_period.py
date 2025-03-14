"""Added net_generation to period

Revision ID: c3a20eff5256
Revises: 7965aaa3e210
Create Date: 2025-02-07 16:46:15.951852

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c3a20eff5256'
down_revision = '7965aaa3e210'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('periods', schema=None) as batch_op:
        batch_op.add_column(sa.Column('net_generation', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('periods', schema=None) as batch_op:
        batch_op.drop_column('net_generation')

    # ### end Alembic commands ###

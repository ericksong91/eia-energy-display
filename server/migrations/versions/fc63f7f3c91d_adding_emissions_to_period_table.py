"""Adding emissions to Period table

Revision ID: fc63f7f3c91d
Revises: a7b0b66862ee
Create Date: 2024-11-07 14:49:21.352837

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fc63f7f3c91d'
down_revision = 'a7b0b66862ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('periods', schema=None) as batch_op:
        batch_op.add_column(sa.Column('nox', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('sox', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('co2', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('periods', schema=None) as batch_op:
        batch_op.drop_column('co2')
        batch_op.drop_column('sox')
        batch_op.drop_column('nox')

    # ### end Alembic commands ###
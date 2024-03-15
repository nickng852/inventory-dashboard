-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "quantity" DROP DEFAULT;

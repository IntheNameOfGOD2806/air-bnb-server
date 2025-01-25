import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { WishlistModuleBase } from "./base/wishlist.module.base";
import { WishlistService } from "./wishlist.service";
import { WishlistController } from "./wishlist.controller";

@Module({
  imports: [WishlistModuleBase, forwardRef(() => AuthModule)],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {}

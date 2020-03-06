import { NgModule } from '@angular/core';
import { InviteGroupModule } from 'src/app/parts/dialog/invite-group/invite-group.module';
import { MapRouteResultModule } from 'src/app/parts/dialog/map/map-route-result/map-route-result.module';
import { PlaceDetailModule } from 'src/app/parts/dialog/place-detail/place-detail.module';

@NgModule({
  imports: [MapRouteResultModule, InviteGroupModule, PlaceDetailModule],
})
export class DialogModule {}

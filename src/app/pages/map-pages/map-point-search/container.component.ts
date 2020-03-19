import { Component } from '@angular/core';
import { ConditionFacade } from 'src/app/store/condition/facades';
import { PlaceFacade } from 'src/app/store/place/facades';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  lastSelectedPlace$ = this.placeFacade.lastSelectedPlace$;
  selectedPlaceList$ = this.placeFacade.selectedPlaceList$;
  sugestPlaceList$ = this.placeFacade.sugestPlaceList$;
  origin$ = this.conditionFacade.origin$;
  destination$ = this.conditionFacade.destination$;
  radius$ = this.conditionFacade.radius$;
  travelMode$ = this.conditionFacade.travelMode$;
  category$ = this.conditionFacade.category$;
  constructor(private placeFacade: PlaceFacade, private conditionFacade: ConditionFacade) {}
}

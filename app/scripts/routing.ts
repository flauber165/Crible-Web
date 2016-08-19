import { Route, Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/default.component';
import { Menu } from './menu'

const routes : Routes = [];

export const menus: Menu[] = [
  { title: 'home', checkPermission: true, action: { path: '', component: DefaultComponent }},
  /*{ title:'submenu', checkPermission: true, action: [
      { title: 'unitMeasurement', action: { path: 'unit-measurement-query', component: UnitMeasurementQueryComponent }, checkPermission: true},
      { title: 'inventory', action: { path: 'unit-measurement-confection', component: UnitMeasurementConfectionComponent }, checkPermission: true},
      { title: 'collection', action: { path: 'purchase-order-report', component: PurchaseOrderReportComponent },  checkPermission: true },
      { title: 'reports', action: { path: 'separation-list-report', component: SeparationListReportComponent }, checkPermission:true}
    ]
  }*/
];

GetRoutes(menus);

function GetRoutes(menus: Menu[]): void {
    for (var index = 0; index < menus.length; index++) 
    {
      var element = menus[index];
      if (element.action['path'] === undefined) {
        GetRoutes(<Menu[]>element.action);
      }
      else {
        routes.push(<Route>element.action);
      }
    }  
}

export const routing = RouterModule.forRoot(routes);
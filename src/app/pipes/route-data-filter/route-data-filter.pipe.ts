import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'routeDataFilter'
})
export class RouteDataFilterPipe implements PipeTransform {

  transform(items: any[], args?: any): any {

    let visibleRoutes = items.filter(item => {
      return item.data;
    });

    return visibleRoutes;
  }

}

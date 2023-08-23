import { APP_INITIALIZER, FactoryProvider } from "@angular/core"
import { environment } from "../../environments/environment";

export function InitializeAppBaseHref(baseHref: string) {
  return () => baseHref;
}

export const AppBaseHrefProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: InitializeAppBaseHref(environment.gitUrl),
  multi: true
};
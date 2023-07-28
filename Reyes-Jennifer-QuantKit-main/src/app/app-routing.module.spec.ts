import { routes } from "./app-routing.module";
import { HomeComponent } from "./home/home.component";
import { PricingComponent } from "./pricing/pricing.component";
import { TradingComponent } from "./trading/trading.component";
import { HedgingComponent } from "./hedging/hedging.component";
import { RiskComponent } from "./risk/risk.component";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./auth.service";

describe('app-routing.module',()=>{

    it('should have a route for /home',()=>{
        let homeRoute = routes.find(route => route.path == 'home');
        expect(homeRoute).toBeTruthy();
        expect(homeRoute?.component).toEqual(HomeComponent);
    });

    it('should have a route for /pricing',()=>{
        let pricingRoute = routes.find(route => route.path == 'pricing');
        expect(pricingRoute).toBeTruthy();
        expect(pricingRoute?.component).toEqual(PricingComponent);
    });

    it('should have a route for /trading',()=>{
        let tradingRoute = routes.find(route => route.path == 'trading');
        expect(tradingRoute).toBeTruthy();
        expect(tradingRoute?.component).toEqual(TradingComponent);
    });

    it('should have a route for /hedging',()=>{
        let hedgingRoute = routes.find(route => route.path == 'hedging');
        expect(hedgingRoute).toBeTruthy();
        expect(hedgingRoute?.component).toEqual(HedgingComponent);
    });

    it('should have a route for /risk',()=>{
        let riskRoute = routes.find(route => route.path == 'risk');
        expect(riskRoute).toBeTruthy();
        expect(riskRoute?.component).toEqual(RiskComponent);
    });

    it('should have a route for /login matched to LoginComponent',()=>{
        let loginRoute = routes.find(route => route.path == 'login');
        expect(loginRoute).toBeTruthy();
        expect(loginRoute?.component).toEqual(LoginComponent);
    });
});
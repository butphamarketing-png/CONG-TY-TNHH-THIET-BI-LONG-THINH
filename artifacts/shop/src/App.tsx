import { useState } from "react";
import { Layout } from "@/components/layout";
import { LogoSplash } from "@/components/LogoSplash";
import { Home } from "@/pages/home";
import { SearchPage } from "@/pages/search";
import { CartPage } from "@/pages/cart";
import { CheckoutPage } from "@/pages/checkout";
import { OrderConfirmationPage } from "@/pages/order-confirmation";
import { OrderLookupPage } from "@/pages/order-lookup";
import { NewsListPage } from "@/pages/news-list";
import { NewsDetailPage } from "@/pages/news-detail";
import { WishlistPage } from "@/pages/wishlist";
import { ShowroomPage } from "@/pages/showroom";
import { PromotionPage } from "@/pages/promotion";
import { CatalogSlugPage } from "@/pages/catalog-slug-page";
import {
  LegacyCategoryRedirect,
  LegacyBrandRedirect,
  LegacyProductRedirect,
} from "@/pages/legacy-redirect";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/khuyen-mai" component={PromotionPage} />
        <Route path="/danh-muc/:slug" component={LegacyCategoryRedirect} />
        <Route path="/san-pham/:slug" component={LegacyProductRedirect} />
        <Route path="/thuong-hieu/:slug" component={LegacyBrandRedirect} />
        <Route path="/showroom" component={ShowroomPage} />
        <Route path="/tim-kiem" component={SearchPage} />
        <Route path="/gio-hang" component={CartPage} />
        <Route path="/dat-hang" component={CheckoutPage} />
        <Route path="/dat-hang/xac-nhan" component={OrderConfirmationPage} />
        <Route path="/tra-cuu-don-hang" component={OrderLookupPage} />
        <Route path="/tin-tuc" component={NewsListPage} />
        <Route path="/tin-tuc/:slug" component={NewsDetailPage} />
        <Route path="/yeu-thich" component={WishlistPage} />
        <Route path="/:slug.html" component={CatalogSlugPage} />
        <Route path="/:slug" component={CatalogSlugPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showSplash && <LogoSplash onComplete={() => setShowSplash(false)} />}
        <WouterRouter base={(import.meta.env.BASE_URL || "/").replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

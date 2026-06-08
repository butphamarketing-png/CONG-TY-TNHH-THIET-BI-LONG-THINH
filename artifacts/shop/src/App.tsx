import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";
import { CategoryPage } from "@/pages/category";
import { ProductDetailPage } from "@/pages/product-detail";
import { SearchPage } from "@/pages/search";
import { CartPage } from "@/pages/cart";
import { CheckoutPage } from "@/pages/checkout";
import { OrderConfirmationPage } from "@/pages/order-confirmation";
import { OrderLookupPage } from "@/pages/order-lookup";
import { NewsListPage } from "@/pages/news-list";
import { NewsDetailPage } from "@/pages/news-detail";
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
        <Route path="/danh-muc/:slug" component={CategoryPage} />
        <Route path="/san-pham/:slug" component={ProductDetailPage} />
        <Route path="/tim-kiem" component={SearchPage} />
        <Route path="/gio-hang" component={CartPage} />
        <Route path="/dat-hang" component={CheckoutPage} />
        <Route path="/dat-hang/xac-nhan" component={OrderConfirmationPage} />
        <Route path="/tra-cuu-don-hang" component={OrderLookupPage} />
        <Route path="/tin-tuc" component={NewsListPage} />
        <Route path="/tin-tuc/:slug" component={NewsDetailPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

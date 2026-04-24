import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { FEEM_LOGO } from "./data/mockData";
import { AppSidebar } from "./components/navigation/AppSidebar";
import { PublicTopNav } from "./components/navigation/PublicTopNav";
import { AppPage, PublicPage, Surface } from "./types/app";
import { PublicHome } from "./pages/public/PublicHome";
import { PublicTech } from "./pages/public/PublicTech";
import { PublicTecnologieDetail } from "./pages/public/PublicTecnologieDetail";
import { PublicCompare } from "./pages/public/PublicCompare";
import { PublicMarkets } from "./pages/public/PublicMarkets";
import { PublicPublications } from "./pages/public/PublicPublications";
import { PublicFonti } from "./pages/public/PublicFonti";
import { PublicBlog } from "./pages/public/PublicBlog";
import { PublicBlogDetail } from "./pages/public/PublicBlogDetail";
import { PublicFontiDetail } from "./pages/public/PublicFontiDetail";
import { PublicAssistant } from "./pages/public/PublicAssistant";
import { PublicMethod } from "./pages/public/PublicMethod";
import { PublicExecutive } from "./pages/public/PublicExecutive";
import { AppDashboard } from "./pages/app/AppDashboard";
import { AdvancedResearch } from "./pages/app/AdvancedResearch";
import { TechnologiesPanel } from "./pages/app/TechnologiesPanel";
import { AppFontiManager } from "./pages/app/AppFontiManager";
import { AppTecnologieManager } from "./pages/app/AppTecnologieManager";
import { EvidencePanel } from "./pages/app/EvidencePanel";
import { EditorialPanel } from "./pages/app/EditorialPanel";
import { SettingsPanel } from "./pages/app/SettingsPanel";

export default function ERMESCloudDemoMockup() {
  const [surface, setSurface] = useState<Surface>("public");
  const [publicPage, setPublicPage] = useState<PublicPage>("home");
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [selectedTechSlug, setSelectedTechSlug] = useState<string | null>(null);
  const [selectedSourceSlug, setSelectedSourceSlug] = useState<string | null>(null);
  const [appPage, setAppPage] = useState<AppPage>("dashboard");

  useEffect(() => {
    const applyHashRoute = () => {
      const hash = window.location.hash;

      if (hash === "#blog") {
        setSurface("public");
        setPublicPage("blog");
        setSelectedArticleSlug(null);
        return;
      }

      if (hash.startsWith("#blog/")) {
        const slug = decodeURIComponent(hash.replace("#blog/", "")).trim();
        setSurface("public");
        setPublicPage("blog-detail");
        setSelectedArticleSlug(slug || null);
        return;
      }

      if (hash === "#tech") {
        setSurface("public");
        setPublicPage("tech");
        setSelectedTechSlug(null);
        return;
      }

      if (hash.startsWith("#tech/")) {
        const slug = decodeURIComponent(hash.replace("#tech/", "")).trim();
        setSurface("public");
        setPublicPage("tech-detail");
        setSelectedTechSlug(slug || null);
        return;
      }

      if (hash === "#fonti") {
        setSurface("public");
        setPublicPage("fonti");
        setSelectedSourceSlug(null);
        return;
      }

      if (hash.startsWith("#fonti/")) {
        const slug = decodeURIComponent(hash.replace("#fonti/", "")).trim();
        setSurface("public");
        setPublicPage("fonti-detail");
        setSelectedSourceSlug(slug || null);
        return;
      }
    };

    applyHashRoute();
    window.addEventListener("hashchange", applyHashRoute);
    return () => window.removeEventListener("hashchange", applyHashRoute);
  }, []);

  const renderPublic = () => {
    if (publicPage === "home") return <PublicHome />;
    if (publicPage === "executive") return <PublicExecutive />;
    if (publicPage === "tech") {
      if (selectedTechSlug) {
        return (
          <PublicTecnologieDetail
            techSlug={selectedTechSlug}
            onBack={() => {
              setPublicPage("tech");
              setSelectedTechSlug(null);
              window.location.hash = "tech";
            }}
          />
        );
      }
      return (
        <PublicTech
          onOpenTech={(techSlug) => {
            setSelectedTechSlug(techSlug);
            setPublicPage("tech-detail");
          }}
        />
      );
    }
    if (publicPage === "tech-detail") {
      return (
        <PublicTecnologieDetail
          techSlug={selectedTechSlug}
          onBack={() => {
            setPublicPage("tech");
            setSelectedTechSlug(null);
            window.location.hash = "tech";
          }}
        />
      );
    }
    if (publicPage === "compare") return <PublicCompare />;
    if (publicPage === "markets") return <PublicMarkets />;
    if (publicPage === "publications") return <PublicPublications />;
    if (publicPage === "fonti") {
      if (selectedSourceSlug) {
        return (
          <PublicFontiDetail
            sourceSlug={selectedSourceSlug}
            onBack={() => {
              setPublicPage("fonti");
              setSelectedSourceSlug(null);
              window.location.hash = "fonti";
            }}
          />
        );
      }
      return (
        <PublicFonti
          onOpenSource={(sourceSlug) => {
            setSelectedSourceSlug(sourceSlug);
            setPublicPage("fonti-detail");
          }}
        />
      );
    }
    if (publicPage === "fonti-detail") {
      return (
        <PublicFontiDetail
          sourceSlug={selectedSourceSlug}
          onBack={() => {
            setPublicPage("fonti");
            setSelectedSourceSlug(null);
            window.location.hash = "fonti";
          }}
        />
      );
    }
    if (publicPage === "blog") {
      return (
        <PublicBlog
          onOpenArticle={(articleSlug) => {
            setSelectedArticleSlug(articleSlug);
            setPublicPage("blog-detail");
            window.location.hash = `blog/${encodeURIComponent(articleSlug)}`;
          }}
        />
      );
    }
    if (publicPage === "blog-detail") {
      return (
        <PublicBlogDetail
          articleSlug={selectedArticleSlug}
          onBack={() => {
            setPublicPage("blog");
            setSelectedArticleSlug(null);
            window.location.hash = "blog";
          }}
        />
      );
    }
    if (publicPage === "assistant") return <PublicAssistant />;
    return <PublicMethod />;
  };

  const renderApp = () => {
    if (appPage === "dashboard") return <AppDashboard />;
    if (appPage === "research") return <AdvancedResearch />;
    if (appPage === "sources") return <AppFontiManager />;
    if (appPage === "technologies") return <AppTecnologieManager />;
    if (appPage === "components") return <TechnologiesPanel />;
    if (appPage === "evidence") return <EvidencePanel />;
    if (appPage === "editorial") return <EditorialPanel />;
    return <SettingsPanel />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
              <img src={FEEM_LOGO} alt="Fondazione Eni Enrico Mattei" className="h-8 w-auto" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Fondazione Eni Enrico Mattei</div>
              <div className="text-xl font-semibold tracking-tight text-slate-950">Mockup ERMES</div>
            </div>
          </div>
          <Tabs value={surface} onValueChange={(v) => setSurface(v as Surface)}>
            <TabsList className="rounded-2xl bg-slate-100 p-1">
              <TabsTrigger value="public" className="rounded-xl">Sito pubblico</TabsTrigger>
              <TabsTrigger value="app" className="rounded-xl">Webapp utente</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {surface === "public" ? (
        <>
          <PublicTopNav publicPage={publicPage} setPublicPage={setPublicPage} />
          <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6">{renderPublic()}</main>
        </>
      ) : (
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 xl:grid-cols-[260px_1fr]">
          <AppSidebar appPage={appPage} setAppPage={setAppPage} />
          <main className="space-y-6">{renderApp()}</main>
        </div>
      )}
    </div>
  );
}

import { QRGenerator } from "@/components/QRGenerator";
import { QrCode, Zap, Palette } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(14,165,233,0.1),transparent)]" />
        
        <div className="relative max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Create Fancy QR Codes Instantly
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
            Generate beautiful, customizable QR codes from any URL. Choose your colors, styles, and download in high quality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Unlimited QR Codes
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              No Signup Required
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Free Forever
            </span>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <QRGenerator />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 mt-20 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>Create beautiful QR codes for your business, events, or personal use</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

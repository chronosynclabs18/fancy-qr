import { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type QRStyle = 'square' | 'dots';

export const QRGenerator = () => {
  const [text, setText] = useState("https://example.com");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState([256]);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('M');
  const [style, setStyle] = useState<QRStyle>('square');
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) return;

    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: size[0],
        height: size[0],
        data: text,
        dotsOptions: {
          color: foregroundColor,
          type: style,
        },
        backgroundOptions: {
          color: backgroundColor,
        },
        qrOptions: {
          errorCorrectionLevel: errorCorrection,
        },
      });
      qrCodeRef.current.append(canvasRef.current);
    } else {
      qrCodeRef.current.update({
        width: size[0],
        height: size[0],
        data: text,
        dotsOptions: {
          color: foregroundColor,
          type: style,
        },
        backgroundOptions: {
          color: backgroundColor,
        },
        qrOptions: {
          errorCorrectionLevel: errorCorrection,
        },
      });
    }
  }, [text, foregroundColor, backgroundColor, size, errorCorrection, style]);

  const downloadQR = (format: 'png' | 'svg' = 'png') => {
    if (!qrCodeRef.current) return;

    qrCodeRef.current.download({
      extension: format,
      name: "qrcode",
    }).then(() => {
      toast.success(`${format.toUpperCase()} QR Code downloaded!`);
    }).catch((err) => {
      console.error(`Error downloading ${format}:`, err);
      toast.error(`Failed to download ${format.toUpperCase()}`);
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
      {/* Controls Card */}
      <Card className="p-8 bg-card shadow-card border-border/50 backdrop-blur-sm">
        <div className="space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="text" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              URL Input
            </Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                className="pl-10 bg-background border-border focus:ring-primary"
              />
            </div>
          </div>

          {/* Customization Section */}
          <div className="space-y-4 pt-4">
            <Label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Customization
            </Label>
            
            {/* Colors */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Colors</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fg-color" className="text-xs text-muted-foreground">
                    Foreground
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="fg-color"
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="flex-1 bg-background border-border text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bg-color" className="text-xs text-muted-foreground">
                    Background
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="bg-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 bg-background border-border text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Style */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Style</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={style === 'square' ? 'default' : 'outline'}
                  onClick={() => setStyle('square')}
                  className={style === 'square' ? 'bg-primary text-primary-foreground' : ''}
                >
                  Squares
                </Button>
                <Button
                  variant={style === 'dots' ? 'default' : 'outline'}
                  onClick={() => setStyle('dots')}
                  className={style === 'dots' ? 'bg-primary text-primary-foreground' : ''}
                >
                  Dots
                </Button>
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <Label htmlFor="size" className="text-sm font-medium flex justify-between">
                <span>Size</span>
                <span className="text-muted-foreground">{size[0]}px</span>
              </Label>
              <Slider
                id="size"
                value={size}
                onValueChange={setSize}
                min={200}
                max={600}
                step={50}
                className="py-4"
              />
            </div>

            {/* Error Correction */}
            <div className="space-y-2">
              <Label htmlFor="error-correction" className="text-sm font-medium">
                Error Correction
              </Label>
              <Select value={errorCorrection} onValueChange={(value: ErrorCorrectionLevel) => setErrorCorrection(value)}>
                <SelectTrigger id="error-correction" className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">Quartile (25%)</SelectItem>
                  <SelectItem value="H">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Download Section */}
          <div className="space-y-3 pt-4">
            <Label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Download
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => downloadQR('png')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Download className="mr-2 h-4 w-4" />
                PNG
              </Button>
              <Button
                onClick={() => downloadQR('svg')}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                SVG
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Preview Card */}
      <Card className="p-8 bg-card shadow-card border-border/50 backdrop-blur-sm lg:sticky lg:top-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20 rounded-lg" />
            <div className="relative bg-background p-8 rounded-2xl shadow-lg border border-border flex items-center justify-center">
              <div ref={canvasRef} className="max-w-full" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Live preview of your QR code
          </p>
        </div>
      </Card>
    </div>
  );
};

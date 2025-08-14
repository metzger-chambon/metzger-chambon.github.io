import Link from "next/link";
import { Button } from "@/app/components/button";
import { Card, CardContent } from "@/app/components/card";
import {
  Dna,
  Network,
  TrendingUp,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <main>
      <section className="relative text-(--foreground)">
        <img
          src="https://media.springernature.com/w580h326/nature-cms/uploads/collections/AdobeStock_477924278_Edit_1.psd.iCeT2L_kMSdTZ8ljwCUA.8kCjC9Nd56-082e3c847215d89ce64902c3cde78263.jpg" // Replace with actual image URL
          alt="Spatial Transcriptomics"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pathophysiological Roles of Vitamin D Signaling Pathways
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Investigating the molecular mechanisms by which vitamin D
              signaling influences cellular processes and disease progression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/studies">
                <Button size="lg" variant="outline">
                  Explore Our Research
                </Button>
              </Link>
              <Link href="/members">
                <Button size="lg" variant="outline">
                  Meet Our Team
                </Button>
              </Link>
              <Link href="/members">
                <Button size="lg" variant="outline">
                  Get Latest News
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-(--background)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-(--foreground) mb-4">
              Research Highlights
            </h2>
            <p className="text-lg text-(--foreground) max-w-2xl mx-auto">
              Our lab focuses on understanding the molecular mechanisms
              underlying vitamin D signaling and its impact on health.
            </p>
          </div>
          <div className="space-y-12">
            {/* Highlight 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-lg leading-relaxed text-(--foreground)">
                  The active form of the hormone vitamin D controls calcium and
                  phosphate levels in the body. In addition, it contributes to
                  the regulation of the inflammation and cell proliferation,
                  conferring a protective, even therapeutic, role in various
                  cancers and autoimmune diseases. To date, the mechanisms
                  underlying the activities of vitamin D have not been
                  elucidated.
                </p>
              </div>
              <Card className="order-1 md:order-2">
                <CardContent className="p-6 ">
                  <div className="w-12 h-12 bg-(--accent-background) rounded-lg flex items-center justify-center mb-4">
                    <Dna className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Genomic Interactions
                  </h3>
                  <p className="text-(--foreground)">
                    Exploring how vitamin D receptors interact with DNA to
                    regulate gene expression and cellular function.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Highlight 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-(--accent-background) rounded-lg flex items-center justify-center mb-4">
                    <Network className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Signal Transduction
                  </h3>
                  <p className="text-(--foreground)">
                    Investigating the pathways through which vitamin D signaling
                    influences cellular responses.
                  </p>
                </CardContent>
              </Card>
              <div>
                <p className="text-lg leading-relaxed text-(--foreground)">
                  This lack of understanding limits its clinical use, since the
                  doses required for the treatment of cancers or autoimmune
                  diseases induce hypercalcemia; resulting in calcification of
                  the kidneys, heart and vessels, leading to dysfunction of
                  these organs.
                </p>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-lg leading-relaxed text-(--foreground)">
                  Our group is interested in understanding how vitamin D
                  controls calcium homeostasis and tumor progression. We focus
                  on rare diseases characterized by impaired vitamin D
                  signaling, and on prostate cancer. We use patient cells and
                  mouse models recapitulating human pathologies, and leverage
                  single-cell and spatial transcriptomic analyses coupled with
                  functional validations. We also collaborate with chemists to
                  characterise new vitamin D analogues with potent therapeutic
                  activities for many diseases that are refractory to current
                  treatments.
                </p>
              </div>
              <Card className="order-1 md:order-2">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-(--accent-background) rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Disease Mechanisms
                  </h3>
                  <p className="text-(--foreground)">
                    Studying how disruptions in vitamin D signaling contribute
                    to disease development and progression.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


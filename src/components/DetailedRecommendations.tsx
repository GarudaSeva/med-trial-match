
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { CheckCircle2, XCircle, Pill, FileSearch, ShieldCheck, Apple, AlertTriangle } from "lucide-react";

interface DetailedRecommendationsProps {
  details: {
    description?: string;
    precautions?: string[];
    medicines?: string[];
    foods_to_avoid?: string[];
    foods_to_eat?: string[];
    recommended_tests?: string[];
    related_diseases?: string[];
  };
}

const DetailedRecommendations = ({ details }: DetailedRecommendationsProps) => {
  if (!details) return null;

  return (
    <div className="mt-4">
      <Accordion type="single" collapsible className="w-full">
        
        {/* Diet Accordion */}
        {(details.foods_to_eat || details.foods_to_avoid) && (
          <AccordionItem value="diet">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2 text-lg">
                <Apple className="w-5 h-5 text-emerald-600" />
                <span>Dietary Recommendations</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                {details.foods_to_eat && (
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                    <h4 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Foods to Eat
                    </h4>
                    <ul className="space-y-2">
                      {details.foods_to_eat.map((item, i) => (
                        <li key={i} className="text-sm text-emerald-700 flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {details.foods_to_avoid && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> Foods to Avoid
                    </h4>
                    <ul className="space-y-2">
                      {details.foods_to_avoid.map((item, i) => (
                        <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Medical / Treatment Accordion */}
        {(details.medicines || details.precautions) && (
          <AccordionItem value="medical">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2 text-lg">
                <Pill className="w-5 h-5 text-blue-600" />
                <span>Medical Treatment & Precautions</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                {details.precautions && (
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Precautions
                    </h4>
                    <ul className="space-y-2">
                      {details.precautions.map((item, i) => (
                        <li key={i} className="text-sm text-blue-700 flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {details.medicines && (
                  <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                    <h4 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                      <Pill className="w-4 h-4" /> Common Medicines
                    </h4>
                    <ul className="space-y-2">
                      {details.medicines.map((item, i) => (
                        <li key={i} className="text-sm text-indigo-700 flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Tests Accordion */}
        {details.recommended_tests && (
          <AccordionItem value="tests">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2 text-lg">
                <FileSearch className="w-5 h-5 text-purple-600" />
                <span>Recommended Future Tests</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100 mt-2">
                <div className="grid sm:grid-cols-2 gap-3">
                  {details.recommended_tests.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-purple-100 text-sm text-purple-800 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

      </Accordion>
    </div>
  );
};

export default DetailedRecommendations;

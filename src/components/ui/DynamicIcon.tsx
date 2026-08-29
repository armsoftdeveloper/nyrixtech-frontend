import {
  LifeBuoy,
  Network,
  ShieldCheck,
  Server,
  DatabaseBackup,
  Activity,
  Cloud,
  Workflow,
  Store,
  UtensilsCrossed,
  BedDouble,
  Stethoscope,
  Factory,
  Truck,
  Briefcase,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const registry: Record<string, ComponentType<LucideProps>> = {
  LifeBuoy,
  Network,
  ShieldCheck,
  Server,
  DatabaseBackup,
  Activity,
  Cloud,
  Workflow,
  Store,
  UtensilsCrossed,
  BedDouble,
  Stethoscope,
  Factory,
  Truck,
  Briefcase,
};

export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = registry[name] || LifeBuoy;
  return <Icon {...props} />;
}

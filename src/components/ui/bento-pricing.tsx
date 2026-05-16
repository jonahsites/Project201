'use client';
import React from 'react';

import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { CheckIcon, SparklesIcon } from 'lucide-react';

type PricingCardProps = {
	titleBadge: string;
	priceLabel: string;
	priceSuffix?: string;
	features: string[];
	cta?: string;
	className?: string;
};

function FilledCheck() {
	return (
		<div className="bg-brand-light-blue text-brand-blue rounded-full p-0.5">
			<CheckIcon className="size-3" strokeWidth={3} />
		</div>
	);
}

function PricingCard({
	titleBadge,
	priceLabel,
	priceSuffix = '',
	features,
	cta = 'Donate',
	className,
}: PricingCardProps) {
	return (
		<div
			className={cn(
				'bg-white border-slate-200 relative overflow-hidden rounded-[2rem] border transition-all hover:shadow-xl group',
				className,
			)}
		>
			<div className="flex items-center gap-3 p-6">
				<Badge variant="secondary" className="font-display uppercase tracking-widest">{titleBadge}</Badge>
				<div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
					<Button variant="outline" size="sm" className="rounded-full font-display uppercase text-[10px] tracking-widest">{cta}</Button>
				</div>
			</div>

			<div className="flex items-end gap-2 px-6 py-2">
				<span className="font-display text-5xl font-bold tracking-tighter text-brand-blue uppercase">
					{priceLabel}
				</span>
				{priceLabel.toLowerCase() !== 'free' && (
					<span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{priceSuffix}</span>
				)}
			</div>

			<ul className="text-slate-600 grid gap-4 p-6 text-sm">
				{features.map((f, i) => (
					<li key={i} className="flex items-center gap-3">
						<FilledCheck />
						<span className="font-medium">{f}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export function BentoPricing() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
			<div
				className={cn(
					'bg-brand-blue relative w-full overflow-hidden rounded-[3rem] border border-white/10 lg:col-span-8 text-white',
				)}
			>
				<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full opacity-20">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white,transparent)]" />
				</div>
				<div className="flex items-center gap-3 p-8 relative z-10">
					<Badge variant="secondary" className="bg-white text-brand-blue font-display font-bold">COMMUNITY VISIONARY</Badge>
					<Badge variant="outline" className="hidden lg:flex border-white/20 text-white font-display">
						<SparklesIcon className="me-1 size-3 text-brand-light-blue" /> Highest Impact
					</Badge>
					<div className="ml-auto">
						<Button className="bg-white text-brand-blue hover:bg-brand-light-blue rounded-full font-display font-bold">SUPPORT NOW</Button>
					</div>
				</div>
				<div className="flex flex-col p-8 lg:flex-row relative z-10">
					<div className="pb-4 lg:w-[40%]">
						<span className="font-display text-7xl font-bold tracking-tighter uppercase text-brand-light-blue">
							$3,750
						</span>
						<p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em] mt-2">Visionary Level Impact</p>
					</div>
					<ul className="text-white/80 grid gap-6 text-sm lg:w-[60%] py-4">
						{[
							'Supports large-scale mentorship impact across the community.',
							'Funds multiple structured programming tracks.',
							'Expands reach to youth facing behavioral challenges.',
							'Ensures long-term sustainability of Project 201.'
						].map((f, i) => (
							<li key={i} className="flex items-start gap-4">
								<div className="bg-brand-light-blue text-brand-blue rounded-full p-1 mt-0.5">
									<CheckIcon className="size-3" strokeWidth={4} />
								</div>
								<span className="leading-relaxed font-medium text-base">{f}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			<PricingCard
				titleBadge="GRASSROOTS"
				priceLabel="$25"
				features={[
					'Helps provide equipment and resources for youth training.',
					'Youth training essentials',
				]}
				className="lg:col-span-4 bg-slate-50"
			/>

			<PricingCard
				titleBadge="SESSION"
				priceLabel="$50"
				features={[
					'Contributes to a full session of mentorship and training.',
					'Personalized guidance',
				]}
				className="lg:col-span-4 bg-white"
			/>

			<PricingCard
				titleBadge="MENTOR"
				priceLabel="$150"
				features={[
					'Helps fund structured mentorship and sports programming.',
					'Guidance and accountability',
				]}
				className="lg:col-span-3"
			/>
      
      <PricingCard
				titleBadge="ADVOCATE"
				priceLabel="$375"
				features={[
					'Funds mentorship and structured programming for one youth.',
					'Consistent role models',
				]}
				className="lg:col-span-3 border-brand-light-blue/30"
			/>

			<PricingCard
				titleBadge="SPONSOR"
				priceLabel="$1,500"
				features={[
					'Helps support multiple youth and expand programming.',
					'Direct community impact',
				]}
				className="lg:col-span-2 bg-brand-light-blue/20 border-brand-light-blue/30"
			/>
		</div>
	);
}

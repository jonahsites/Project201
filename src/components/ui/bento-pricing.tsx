'use client';
import React from 'react';

import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { CheckIcon, SparklesIcon, Zap, Heart, Target, Shield, Crown, Globe } from 'lucide-react';

type PricingCardProps = {
	titleBadge: string;
	priceLabel: string;
	priceSuffix?: string;
	features: string[];
	cta?: string;
	className?: string;
	icon?: React.ElementType;
	onSelect?: (amount: string) => void;
};

function FilledCheck() {
	return (
		<div className="text-brand-light-blue">
			<CheckIcon className="size-4" strokeWidth={1.5} />
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
	icon: Icon = Heart,
	onSelect,
}: PricingCardProps) {
	return (
		<div
			className={cn(
				'bg-white border-slate-100 relative overflow-hidden rounded-[2.5rem] border transition-all hover:shadow-2xl hover:-translate-y-1 group p-8 flex flex-col',
				className,
			)}
		>
			<div className="flex items-center justify-between mb-8">
				<div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-slate-200 font-display font-medium uppercase tracking-[0.2em] text-[10px] px-3 py-1")}>
					{titleBadge}
				</div>
				<div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-brand-light-blue group-hover:bg-brand-light-blue/10 transition-colors">
					<Icon className="w-5 h-5" strokeWidth={1.5} />
				</div>
			</div>

			<div className="flex items-end gap-1 mb-8">
				<span className="font-display text-4xl font-light text-brand-blue tracking-tight">
					{priceLabel}
				</span>
				{priceLabel.toLowerCase() !== 'free' && (
					<span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1.5 ml-1">{priceSuffix || 'USD'}</span>
				)}
			</div>

			<ul className="text-slate-500 grid gap-4 text-sm font-light leading-relaxed flex-grow">
				{features.map((f, i) => (
					<li key={i} className="flex items-start gap-3">
						<FilledCheck />
						<span>{f}</span>
					</li>
				))}
			</ul>

			<div className="mt-8 pt-8 border-t border-slate-50">
				<Button 
					onClick={() => {
						const num = priceLabel.replace('$', '').replace(',', '');
						onSelect?.(num);
					}}
					variant="outline" 
					className="w-full rounded-2xl font-display font-bold uppercase text-[10px] tracking-[0.2em] h-12 border-slate-200 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all"
				>
					{cta}
				</Button>
			</div>
		</div>
	);
}

export function BentoPricing({ onSelect }: { onSelect?: (amount: string) => void }) {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8 lg:grid-rows-2">
			<div
				className={cn(
					'bg-brand-blue relative w-full overflow-hidden rounded-[3rem] border border-white/5 lg:col-span-6 lg:row-span-2 text-white p-10 md:p-14',
				)}
			>
				<div className="pointer-events-none absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent)]" />
					<div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-light-blue rounded-full blur-[120px]" />
				</div>

				<div className="relative z-10 flex flex-col gap-12 items-start h-full">
					<div className="space-y-8">
						<div className="flex flex-wrap items-center gap-4">
							<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-white/10 hover:bg-white/20 text-brand-light-blue border-white/10 font-display font-medium uppercase tracking-[0.2em] text-[10px] px-4 py-1.5">
								STRATEGIC IMPACT
							</div>
							<div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
								<Crown className="w-3 h-3 text-brand-light-blue" />
								Highest Tier
							</div>
						</div>

						<div>
							<span className="font-display text-7xl md:text-8xl font-light tracking-tight text-white">
								$3,750
							</span>
							<p className="text-brand-light-blue text-xs font-bold uppercase tracking-[0.3em] mt-4">Visionary Level Catalyst</p>
						</div>

						<p className="text-white/60 font-light text-lg leading-relaxed max-w-xl">
							Supports large-scale mentorship impact across the entire community, ensuring long-term sustainability of Project 201's core mission.
						</p>

						<Button 
							onClick={() => onSelect?.('3750')}
							className="bg-white text-brand-blue hover:bg-brand-light-blue rounded-2xl px-10 py-6 font-display font-bold uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-brand-blue/50 transition-all hover:scale-105 active:scale-95"
						>
							FUND THIS VISION
						</Button>
					</div>

					<div className="w-full">
						<ul className="grid md:grid-cols-2 gap-6">
							{[
								'Supports large-scale mentorship impact.',
								'Funds multiple programming tracks.',
								'Expands reach to vulnerable youth.',
								'Ensures long-term sustainability.'
							].map((f, i) => (
								<li key={i} className="flex items-start gap-4 group">
									<div className="shrink-0 w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-light-blue group-hover:bg-brand-light-blue group-hover:text-brand-blue transition-all duration-500">
										<CheckIcon className="size-4" strokeWidth={2} />
									</div>
									<span className="text-white/80 font-light text-sm leading-relaxed">{f}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<PricingCard
				titleBadge="SPONSOR"
				priceLabel="$1,500"
				icon={Globe}
				onSelect={onSelect}
				features={[
					'Helps support multiple youth and expand programming.',
					'Direct community impact',
				]}
				className="lg:col-span-2 bg-brand-light-blue/5 border-brand-light-blue/10"
			/>

			<PricingCard
				titleBadge="ADVOCATE"
				priceLabel="$375"
				icon={Shield}
				onSelect={onSelect}
				features={[
					'Mentorship and structured training for one youth.',
					'Consistent role models',
				]}
				className="lg:col-span-2 border-brand-light-blue/20"
			/>

			<PricingCard
				titleBadge="MENTOR"
				priceLabel="$150"
				icon={Target}
				onSelect={onSelect}
				features={[
					'Fund structured mentorship and sports programming.',
					'Guidance and accountability',
				]}
				className="lg:col-span-3"
			/>

			<PricingCard
				titleBadge="SESSION"
				priceLabel="$50"
				icon={Zap}
				onSelect={onSelect}
				features={[
					'Contributes to a full training session.',
					'Personalized guidance',
				]}
				className="lg:col-span-3"
			/>

			<PricingCard
				titleBadge="GRASSROOTS"
				priceLabel="$25"
				icon={Heart}
				onSelect={onSelect}
				features={[
					'Provides gear and equipment for youth.',
					'Training essentials',
				]}
				className="lg:col-span-2"
			/>
		</div>
	);
}

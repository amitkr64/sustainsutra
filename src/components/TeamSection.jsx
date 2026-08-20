import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Linkedin, GraduationCap } from 'lucide-react';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/**
 * Team section. Shows the founder with real info. The "join us" card replaces
 * fake placeholder team members — it's honest and also serves as a recruiting
 * signal. Replace/add real team members as they join.
 */
const team = [
    {
        name: 'Amit Kumar',
        role: 'Founder & CEO',
        credential: 'ISO 14064 Lead Verifier (GHG) · EPD/PCF Verification Expert · ESG & decarbonization consultant for cement, steel, chemicals, textile and energy sectors. Founder, SustainSutra GreenTech LLP (Startup Bihar seed-fund selected).',
        initials: 'AK',
        linkedin: 'https://www.linkedin.com/in/amit-kumar-42a79927/',
    },
];

const TeamSection = () => {
    const { t } = useTranslation();
    return (
        <section className="section-padding bg-background" id="team">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{t('home.teamEyebrow')}</p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {t('home.teamTitle')}
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        {t('home.teamSub')}
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {/* Founder */}
                    {team.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={fadeUp}
                            whileHover={{ y: -4 }}
                            className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                                {member.initials}
                            </div>
                            <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                            <p className="mt-0.5 text-sm font-medium text-primary">{member.role}</p>
                            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{member.credential}</p>
                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                    aria-label={`${member.name} on LinkedIn`}
                                >
                                    <Linkedin size={16} />
                                </a>
                            )}
                        </motion.div>
                    ))}

                    {/* Join us card (replaces fake placeholders) */}
                    <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/30 p-6 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                            <GraduationCap size={28} />
                        </div>
                        <h3 className="text-base font-bold text-foreground">Join Our Team</h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            We&apos;re expanding our network of ESG auditors, GHG specialists, and sustainability strategists.
                        </p>
                        <a href="mailto:info@sustainsutra.in" className="mt-4 text-sm font-medium text-primary hover:underline">
                            Get in touch →
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default TeamSection;

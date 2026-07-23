import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/**
 * Team/founders section. Builds credibility for an advisory firm.
 *
 * NOTE: Team members below are PLACEHOLDERS. Replace each entry with real
 * name, role, credential, and a LinkedIn URL before this goes public.
 */
const team = [
    {
        name: 'Dr. Amit Kumar',
        role: 'Founder & Lead ESG Advisor',
        credential: 'Ph.D. Environmental Science · 15+ years in carbon accounting & ISO 14064 auditing',
        initials: 'AK',
        linkedin: 'https://www.linkedin.com/in/amit-kumar-42a79927/',
    },
    {
        name: '[Team Member 2]',
        role: '[Designation]',
        credential: 'TODO: Replace with real team member credential.',
        initials: 'TM',
        linkedin: '#',
    },
    {
        name: '[Team Member 3]',
        role: '[Designation]',
        credential: 'TODO: Replace with real team member credential.',
        initials: 'TM',
        linkedin: '#',
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
                            {member.linkedin && member.linkedin !== '#' && (
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
                </motion.div>
            </div>
        </section>
    );
};

export default TeamSection;

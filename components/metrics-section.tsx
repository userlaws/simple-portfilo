'use client';

import { useLanguage } from '@/contexts/language-context';
import type { TranslationKey } from '@/lib/translations';
import {
  FaTicketAlt,
  FaCheckCircle,
  FaDesktop,
  FaServer,
  FaChartLine,
  FaBolt,
  FaShieldAlt,
  FaDatabase,
  FaCogs,
  FaLinux,
} from 'react-icons/fa';

interface Metric {
  label: string;
  value: string;
  tooltip?: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
}

const getMetrics = (t: (key: TranslationKey) => string): Metric[] => [
  {
    label: t('metricsTicketsResolvedLabel'),
    value: '40+',
    tooltip: t('metricsTicketsResolvedTooltip'),
    icon: FaTicketAlt,
    color: '#3b82f6',
  },
  {
    label: t('metricsFirstCallLabel'),
    value: '≈95%',
    tooltip: t('metricsFirstCallTooltip'),
    icon: FaCheckCircle,
    color: '#10b981',
  },
  {
    label: t('metricsDevicesImagedLabel'),
    value: '200+',
    tooltip: t('metricsDevicesImagedTooltip'),
    icon: FaDesktop,
    color: '#f59e0b',
  },
  {
    label: t('metricsServicesSelfHostedLabel'),
    value: '10+ active',
    tooltip: t('metricsServicesSelfHostedTooltip'),
    icon: FaServer,
    color: '#8b5cf6',
  },
  {
    label: t('metricsGitHubContributionsLabel'),
    value: '207+',
    tooltip: t('metricsGitHubContributionsTooltip'),
    icon: FaChartLine,
    color: '#06b6d4',
  },
  {
    label: t('metricsUptimeLabel'),
    value: '99.9%',
    tooltip: t('metricsUptimeTooltip'),
    icon: FaBolt,
    color: '#ef4444',
  },
  {
    label: t('authProviders'),
    value: t('authProvidersValue'),
    tooltip: t('metricsAuthProvidersTooltip'),
    icon: FaShieldAlt,
    color: '#8b5cf6',
  },
  {
    label: t('dbsShipped'),
    value: t('dbsShippedValue'),
    tooltip: t('metricsDbsShippedTooltip'),
    icon: FaDatabase,
    color: '#10b981',
  },
  {
    label: t('ciPipelines'),
    value: t('ciPipelinesValue'),
    tooltip: t('metricsCiPipelinesTooltip'),
    icon: FaCogs,
    color: '#f59e0b',
  },
  {
    label: t('osMaintained'),
    value: t('osMaintainedValue'),
    tooltip: t('metricsOsMaintainedTooltip'),
    icon: FaLinux,
    color: '#1793d1',
  },
];

export function MetricsSection() {
  const { t } = useLanguage();
  const metrics = getMetrics(t);

  return (
    <section className='py-16 sm:py-20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl sm:text-3xl font-bold mb-4'>
            {t('performanceMetrics')}
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            {t('performanceMetricsDesc')}
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {metrics.map((metric, index) => (
            <div
              key={index}
              className='group relative bg-card/70 border border-border/70 rounded-2xl p-6 hover:border-accent/40 transition-colors duration-300'
              title={metric.tooltip}
            >
              <div className='flex items-center gap-3 mb-3'>
                <metric.icon
                  className='text-2xl group-hover:scale-110 transition-transform duration-300'
                  style={{ color: metric.color }}
                />
                <h3 className='text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300'>
                  {metric.label}
                </h3>
              </div>
              <div className='text-2xl sm:text-3xl font-bold text-foreground group-hover:text-accent transition-colors duration-300'>
                {metric.value}
              </div>

              {/* Tooltip on hover */}
              {metric.tooltip && (
                <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 max-w-xs'>
                  {metric.tooltip}
                  <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover'></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional context */}
        <div className='mt-12 text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg text-sm text-muted-foreground'>
            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
            {t('metricsVerified')}
          </div>
        </div>
      </div>
    </section>
  );
}

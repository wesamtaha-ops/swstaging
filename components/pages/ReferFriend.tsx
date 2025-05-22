import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Copy,
  Mail,
  Share2,
  Award,
  Users,
  Sparkles,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';


export default function ReferPage() {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [activeReward, setActiveReward] = useState<number | null>(null);
  const referralCode = 'FRIEND2024';
  const referralLink = `https://formify.com/signup?ref=${referralCode}`;

  const { t } = useTranslation();

  const rewards = [
    {
      level: 1,
      invites: 3,
      reward: t('refer.reward1'),
      icon: Gift,
      color: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50',
      textLight: 'text-blue-600',
      progress: 1,
    },
    {
      level: 2,
      invites: 5,
      reward: t('refer.reward3'),
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      bgLight: 'bg-purple-50',
      textLight: 'text-purple-600',
      progress: 0,
    },
    {
      level: 3,
      invites: 10,
      reward: t('refer.reward6'),
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      bgLight: 'bg-pink-50',
      textLight: 'text-pink-600',
      progress: 0,
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!', {
      icon: '📋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
      toast.success('Invitation sent successfully!', {
        icon: '✉️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const handleShare = (platform: string) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=Join%20me%20on%20Formify%20and%20get%20amazing%20rewards!%20${encodeURIComponent(
        referralLink,
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        referralLink,
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        referralLink,
      )}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <div className='inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4 shadow-lg'>
              <Gift className='h-8 w-8 text-white' />
            </div>
            <h1 className='text-5xl   font-bold font-almarai font-almarai  font-almarai bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6'>
              {t('refer.hero_title')}
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              {t('refer.hero_description')}
            </p>
          </motion.div>
        </div>

        {/* Referral Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12 transform hover:scale-[1.02] transition-all duration-300'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='flex-1 w-full'>
              <label className='block text-lg font-almarai text-gray-900 mb-3'>
                {t('refer.referralLinkLabel')}
              </label>
              <div className='flex rounded-lg shadow-sm'>
                <input
                  type='text'
                  readOnly
                  value={referralLink}
                  className='flex-1 min-w-0 block w-full px-4 py-3 rounded-l-lg border border-gray-300 bg-gray-50 text-gray-600 sm:text-sm focus:ring-2 focus:ring-indigo-500'
                />
                <button
                  onClick={handleCopyLink}
                  className='inline-flex items-center px-6 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-white text-sm font-almarai text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200'>
                  <Copy className='h-5 w-5 mr-2' />
                  {t('refer.copyLink')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rewards Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='mb-16'>
          <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-center mb-4'>
            {t('refer.rewardsTitle')}
          </h2>
          <p className='text-gray-600 text-center mb-12 max-w-2xl mx-auto'>
            {t('refer.rewardsDesc')}
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.level}
                className='relative group'
                onHoverStart={() => setActiveReward(index)}
                onHoverEnd={() => setActiveReward(null)}
                whileHover={{ y: -5 }}>
                <div className='bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden'>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${reward.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div
                    className={`inline-flex items-center justify-center p-4 rounded-xl ${reward.bgLight} ${reward.textLight} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <reward.icon className='h-8 w-8' />
                  </div>

                  <div className='absolute top-4 right-4 bg-indigo-600 text-white text-xs   font-bold font-almarai font-almarai  font-almarai px-3 py-1 rounded-full'>
                    {t('refer.level')} {reward.level}
                  </div>

                  <h3 className='text-xl   font-bold font-almarai font-almarai  font-almarai mb-3'>{reward.reward}</h3>

                  <div className='mt-6'>
                    <div className='flex justify-between text-sm mb-2'>
                      <span className='text-gray-600'>
                        {reward.progress} / {reward.invites} {t('refer.invited')}
                      </span>
                      <span className='text-indigo-600 font-almarai'>
                        {Math.round((reward.progress / reward.invites) * 100)}%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${reward.color}`}
                        style={{
                          width: `${(reward.progress / reward.invites) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeReward === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className='absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 rounded-2xl flex items-center justify-center'>
                        <div className='text-center text-white p-6'>
                          <Zap className='h-8 w-8 mx-auto mb-4' />
                          <p className='text-lg font-almarai mb-2'>
                            {reward.invites - reward.progress} {t('refer.moreInvites')}
                          </p>
                          <button className='mt-4 px-6 py-2 bg-white text-gray-900 rounded-lg font-almarai hover:bg-gray-100 transition-colors duration-200'>
                            {t('refer.startInviting')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Invite Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
          <h2 className='text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-6'>
            {t('refer.inviteTitle')}
          </h2>
          <form onSubmit={handleInvite} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-almarai text-gray-700 mb-2'>
                {t('refer.inviteLabel')}
              </label>
              <div className='flex rounded-lg shadow-sm'>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='flex-1 min-w-0 block w-full px-4 py-3 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='friend@example.com'
                />
                <button
                  type='submit'
                  className='inline-flex items-center px-6 py-3 border border-transparent rounded-r-lg shadow-sm text-sm font-almarai text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200'>
                  <Mail className='h-5 w-5 mr-2' />
                  {t('refer.sendInvite')}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {emails.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className='space-y-4'>
                  <h3 className='text-lg font-almarai text-gray-900'>
                    {t('refer.sentInvitations')}
                  </h3>
                  <div className='space-y-2'>
                    {emails.map((invitedEmail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg'>
                        <div className='flex items-center'>
                          <div className='h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center'>
                            <Mail className='h-4 w-4 text-indigo-600' />
                          </div>
                          <span className='ml-3 text-sm font-almarai text-gray-900'>
                            {invitedEmail}
                          </span>
                        </div>
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-almarai bg-green-100 text-green-800'>
                          <Check className='h-3 w-3 mr-1' />
                          {t('refer.invited')}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='mt-16'>
          <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-center mb-12'>
            {t('refer.howItWorksTitle')}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                icon: Share2,
                title: t('refer.step1Title'),
                description:
                  t('refer.step1Desc'),
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Users,
                title: t('refer.step2Title'),
                description: t('refer.step2Desc'),
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Gift,
                title: t('refer.step3Title'),
                description: t('refer.step3Desc'),
                color: 'from-pink-500 to-rose-500',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className='relative group'>
                <div className='bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center relative overflow-hidden'>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <div className='relative'>
                    <div className='inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 mb-6 group-hover:scale-110 transition-transform duration-300'>
                      <step.icon className='h-8 w-8 text-indigo-600' />
                    </div>
                    <h3 className='text-xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-3'>
                      {step.title}
                    </h3>
                    <p className='text-gray-600'>{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

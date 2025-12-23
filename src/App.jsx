import React, { useState, useEffect, useMemo } from 'react';
import { Mail, Upload, Send, BarChart3, Users, Clock, TrendingUp, CheckCircle, XCircle, Zap, Brain, Calendar, Check, Shield, Crown, Rocket, X, CreditCard, Lock, Settings, LogOut, Home } from 'lucide-react';

export default function OutreachAIComplete() {
  const [currentView, setCurrentView] = useState('pricing');
  const [userPlan, setUserPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  const [activeTab, setActiveTab] = useState('compose');
  const [contacts, setContacts] = useState([]);
  const [emailTemplate, setEmailTemplate] = useState('');
  const [subject, setSubject] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [sending, setSending] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [creditsRemaining, setCreditsRemaining] = useState(2847);

  const analytics = useMemo(() => ({
    sent: 487,
    delivered: 476,
    opened: 168,
    clicked: 42,
    replied: 15,
    bounced: 11
  }), []);

  const plans = useMemo(() => [
    {
      id: 'starter',
      name: 'Starter',
      icon: Rocket,
      color: 'from-blue-500 to-cyan-500',
      priceMonthly: 99,
      priceYearly: 950,
      emailsIncluded: 1000,
      description: 'Perfect for small teams testing cold outreach',
      features: [
        '1,000 emails per month',
        'Basic AI personalization',
        'Email validation',
        'Spam score detection',
        'Basic analytics',
        'Email support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      priceMonthly: 299,
      priceYearly: 2870,
      emailsIncluded: 5000,
      description: 'Most popular for growing sales teams',
      popular: true,
      features: [
        '5,000 emails per month',
        'Advanced AI personalization',
        'Smart send-time optimization',
        'A/B testing engine',
        'Deliverability warmup',
        'Advanced analytics & insights',
        'Auto follow-up sequences',
        'Priority support',
        'CRM integrations'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      priceMonthly: 799,
      priceYearly: 7670,
      emailsIncluded: 25000,
      description: 'For teams that need scale and white-label',
      features: [
        '25,000 emails per month',
        'Everything in Professional',
        'White-label option',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'Team collaboration',
        'Advanced security & SSO'
      ]
    }
  ], []);

  const personalizationVars = useMemo(() => [
    { var: '{{firstName}}', desc: 'First name' },
    { var: '{{company}}', desc: 'Company name' },
    { var: '{{role}}', desc: 'Job title' },
    { var: '{{industry}}', desc: 'Industry' }
  ], []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadStatus('Processing...');
    setTimeout(() => {
      const demoContacts = Array.from({ length: 523 }, (_, i) => ({
        id: i + 1,
        firstName: `Contact${i + 1}`,
        lastName: `User`,
        email: `contact${i + 1}@company${Math.floor(i / 10)}.com`,
        company: `Company ${Math.floor(i / 10) + 1}`,
        industry: ['Tech', 'Finance', 'Healthcare', 'Retail'][i % 4],
        role: ['CEO', 'CTO', 'VP Sales', 'Director'][i % 4]
      }));
      setContacts(demoContacts);
      setUploadStatus(`✓ ${demoContacts.length} contacts imported`);
    }, 800);
  };

  const handleAIEnhance = () => {
    setEmailTemplate(`Hi {{firstName}},

I noticed {{company}} is in the {{industry}} sector, and companies like yours often struggle with scaling their outreach while maintaining personalization.

As a {{role}}, you're probably focused on driving growth efficiently. Our platform has helped similar companies increase response rates by 340% through AI-powered personalization that goes beyond simple name insertion.

Would you be open to a 15-minute call next week to see if this could work for {{company}}?

Best regards`);
  };

  const handleSendCampaign = () => {
    if (!emailTemplate || !subject || contacts.length === 0) {
      alert('Please upload contacts and create your email template');
      return;
    }

    setSending(true);
    const campaign = {
      id: Date.now(),
      name: subject,
      contacts: contacts.length,
      status: 'sending',
      created: new Date().toISOString(),
      schedule: 'Smart scheduling enabled'
    };

    setCampaigns(prev => [campaign, ...prev]);

    setTimeout(() => {
      setSending(false);
      setCampaigns(prev => prev.map(c => c.id === campaign.id ? { ...c, status: 'active' } : c));
      setActiveTab('analytics');
      setCreditsRemaining(prev => Math.max(0, prev - contacts.length));
    }, 2000);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    
    setTimeout(() => {
      setPaymentProcessing(false);
      setUserPlan(selectedPlan);
      setShowCheckout(false);
      setCurrentView('dashboard');
      setCreditsRemaining(selectedPlan.emailsIncluded || 2500);
    }, 1500);
  };

  const CheckoutModal = () => {
    if (!showCheckout || !selectedPlan) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/30 rounded-2xl max-w-md w-full p-8 relative">
          <button
            onClick={() => setShowCheckout(false)}
            className="absolute top-4 right-4 text-purple-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-2xl font-bold text-white mb-2">Complete Your Purchase</h3>
          <p className="text-purple-300 mb-6">You're subscribing to {selectedPlan.name}</p>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">{selectedPlan.name} Plan</span>
              <span className="text-white font-bold">
                ${billingCycle === 'monthly' ? selectedPlan.priceMonthly : selectedPlan.priceYearly}
              </span>
            </div>
            <div className="text-sm text-purple-300">
              {selectedPlan.emailsIncluded?.toLocaleString()} emails per {billingCycle === 'monthly' ? 'month' : 'year'}
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
            />

            <div className="bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="flex-1 bg-transparent text-white placeholder-purple-300/50 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM / YY"
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                placeholder="123"
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
              />
            </div>

            <button
              onClick={handlePayment}
              disabled={paymentProcessing}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {paymentProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Subscribe Now
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-purple-400">
              <Shield className="w-4 h-4" />
              <span>Secured by Stripe • 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (currentView === 'pricing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="border-b border-purple-500/20 bg-black/20 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">OutreachAI Pro</h1>
                <p className="text-xs text-purple-300">AI-Powered Email Automation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-purple-300 mb-8">Start free, scale as you grow. No hidden fees.</p>

            <div className="flex items-center justify-center gap-4 mb-4">
              <span className={billingCycle === 'monthly' ? 'text-white font-medium' : 'text-purple-400'}>Monthly</span>
              <button
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-14 h-7 bg-purple-500/30 rounded-full"
              >
                <div className={`absolute top-1 left-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-7' : ''
                }`}></div>
              </button>
              <span className={billingCycle === 'yearly' ? 'text-white font-medium' : 'text-purple-400'}>Yearly</span>
              {billingCycle === 'yearly' && (
                <span className="bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full font-medium">Save 20%</span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white/5 backdrop-blur border rounded-2xl p-6 relative transition-transform hover:scale-105 ${
                  plan.popular ? 'border-purple-500 shadow-2xl shadow-purple-500/20' : 'border-purple-500/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} mb-4`}>
                  <plan.icon className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-purple-300 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">
                      ${billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                    </span>
                    <span className="text-purple-300">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  <p className="text-sm text-purple-400 mt-2">{plan.emailsIncluded.toLocaleString()} emails included</p>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 rounded-lg font-semibold mb-6 transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-purple-500/30'
                  }`}
                >
                  Get Started
                </button>

                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-purple-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <CheckoutModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="border-b border-purple-500/20 bg-black/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">OutreachAI Pro</h1>
                <p className="text-xs text-purple-300">AI-Powered Email Automation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-purple-300">Credits Remaining</div>
                <div className="text-2xl font-bold text-green-400">{creditsRemaining.toLocaleString()}</div>
              </div>
              <button
                onClick={() => setCurrentView('pricing')}
                className="text-purple-300 hover:text-white p-2"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-purple-500/20 bg-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'compose', label: 'Compose', icon: Mail },
              { id: 'contacts', label: 'Contacts', icon: Users },
              { id: 'campaigns', label: 'Campaigns', icon: Send },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-purple-400 text-white bg-purple-500/10'
                    : 'border-transparent text-purple-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'compose' && (
          <div className="bg-white/5 backdrop-blur border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              AI-Powered Email Composer
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Subject Line</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Quick question about {{company}}'s growth"
                  className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Template</label>
                <textarea
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  placeholder="Write your email template here..."
                  rows={12}
                  className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 font-mono text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAIEnhance}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-lg font-medium transition-all"
                >
                  <Brain className="w-4 h-4" />
                  AI Enhance
                </button>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-purple-300">Personalization Variables</h3>
                <div className="grid grid-cols-2 gap-3">
                  {personalizationVars.map(v => (
                    <div key={v.var} className="flex items-center gap-2 text-sm">
                      <code className="bg-black/40 px-2 py-1 rounded text-purple-300">{v.var}</code>
                      <span className="text-purple-200">{v.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-white/5 backdrop-blur border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Contact Management</h2>

            <div className="mb-6">
              <label className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-dashed border-purple-500/50 rounded-xl p-8 cursor-pointer hover:border-purple-400 transition-all">
                <Upload className="w-6 h-6" />
                <span className="font-medium">Upload CSV (Email, First Name, Last Name, Company, Role, Industry)</span>
                <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
              </label>
              {uploadStatus && <p className="mt-3 text-center text-green-400 font-medium">{uploadStatus}</p>}
            </div>

            {contacts.length > 0 && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{contacts.length} Contacts Loaded</h3>
                </div>
                <div className="bg-black/30 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-purple-500/20">
                      <tr>
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Company</th>
                        <th className="text-left p-3">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.slice(0, 10).map(contact => (
                        <tr key={contact.id} className="border-b border-purple-500/10">
                          <td className="p-3">{contact.firstName} {contact.lastName}</td>
                          <td className="p-3 text-purple-300">{contact.email}</td>
                          <td className="p-3">{contact.company}</td>
                          <td className="p-3">{contact.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {contacts.length > 10 && (
                    <div className="p-3 text-center text-purple-300 text-sm">
                      + {contacts.length - 10} more contacts
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="bg-white/5 backdrop-blur border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Launch Campaign</h2>
              <button
                onClick={handleSendCampaign}
                disabled={sending || !emailTemplate || contacts.length === 0}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-all"
              >
                <Send className="w-4 h-4" />
                {sending ? 'Launching...' : 'Launch Campaign'}
              </button>
            </div>

            {sending && (
              <div className="mb-6 bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-400 border-t-transparent"></div>
                  <span className="font-medium">Campaign launching...</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {campaigns.length === 0 ? (
                <div className="text-center py-12 text-purple-300">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No campaigns yet. Create your first campaign above!</p>
                </div>
              ) : (
                campaigns.map(campaign => (
                  <div key={campaign.id} className="bg-black/30 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{campaign.name}</h4>
                        <p className="text-sm text-purple-300">{campaign.contacts} contacts</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Open Rate', value: `${((analytics.opened / analytics.sent) * 100).toFixed(1)}%`, change: '+12.3%', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
                { label: 'Click Rate', value: `${((analytics.clicked / analytics.sent) * 100).toFixed(1)}%`, change: '+8.7%', icon: BarChart3, color: 'from-purple-500 to-pink-500' },
                { label: 'Reply Rate', value: `${((analytics.replied / analytics.sent) * 100).toFixed(1)}%`, change: '+15.2%', icon: CheckCircle, color: 'from-green-500 to-emerald-500' }
              ].map(stat => (
                <div key={stat.label} className="bg-white/5 backdrop-blur border border-purple-500/20 rounded-xl p-6">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-purple-300 mb-2">{stat.label}</div>
                  <div className="text-xs text-green-400">{stat.change} vs last campaign</div>
                </div>
              ))}
            </div>

import React, { useState } from 'react';
import { Mail, Upload, Send, BarChart3, Users, TrendingUp, CheckCircle, Zap, Brain, Calendar, Check, Shield, Crown, Rocket, X, Building2, Phone } from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
    priceMonthly: 99,
    priceYearly: 950,
    emailsIncluded: 1000,
    description: 'Perfect for small teams testing cold outreach',
    features: ['1,000 emails per month', 'Basic AI personalization', 'Email validation', 'Spam score detection', 'Basic analytics', 'Email support']
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
    features: ['5,000 emails per month', 'Advanced AI personalization', 'Smart send-time optimization', 'A/B testing engine', 'Deliverability warmup', 'Advanced analytics & insights', 'Auto follow-up sequences', 'Priority support', 'CRM integrations']
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
    features: ['25,000 emails per month', 'Everything in Professional', 'White-label option', 'Dedicated account manager', 'Custom integrations', 'API access', 'Team collaboration', 'Advanced security & SSO']
  }
];

export default function App() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [monthlyVolume, setMonthlyVolume] = useState('');
  const [message, setMessage] = useState('');

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowRequestForm(true);
    setFormSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const leadData = {
      plan: selectedPlan.name,
      price: `$${billingCycle === 'monthly' ? selectedPlan.priceMonthly : selectedPlan.priceYearly}/${billingCycle === 'monthly' ? 'mo' : 'yr'}`,
      billingCycle,
      name,
      email,
      company,
      phone,
      monthlyVolume,
      message,
      timestamp: new Date().toLocaleString()
    };
    
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'cf7fd870-7900-4ede-a19d-ff22679d296e',
          subject: `🚀 New OutreachAI Lead: ${selectedPlan.name} Plan - ${company}`,
          from_name: 'OutreachAI Pro',
          to: 'prooutreachai@gmail.com',
          message: `
NEW LEAD ALERT! 🎉

Plan: ${leadData.plan}
Price: ${leadData.price}
Billing: ${leadData.billingCycle}

CONTACT INFO:
Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone || 'Not provided'}

DETAILS:
Monthly Volume: ${monthlyVolume}
Use Case: ${message || 'Not provided'}

Submitted: ${leadData.timestamp}

---
NEXT STEPS:
1. Reply to ${email} within 24 hours
2. Send payment link (Stripe/PayPal)
3. Create account after payment
4. Give 1,000 bonus credits
          `
        })
      });
    } catch (error) {
      console.error('Email error:', error);
    }
    
    setFormSubmitted(true);
    
    setTimeout(() => {
      setShowRequestForm(false);
      setName('');
      setEmail('');
      setCompany('');
      setPhone('');
      setMonthlyVolume('');
      setMessage('');
      setFormSubmitted(false);
    }, 5000);
  };

  const RequestAccessModal = () => {
    if (!showRequestForm || !selectedPlan) return null;

    if (formSubmitted) {
      return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-green-500/30 rounded-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Received! 🎉</h3>
            <p className="text-purple-300 mb-4">Thanks for your interest in the <span className="text-white font-semibold">{selectedPlan.name}</span> plan!</p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-left mb-4">
              <p className="text-sm text-purple-200 mb-2">📧 Check your email: <span className="text-white font-medium">{email}</span></p>
              <p className="text-sm text-purple-200">We'll send you:</p>
              <ul className="text-sm text-purple-300 mt-2 space-y-1 ml-4">
                <li>• Login credentials</li>
                <li>• Payment link</li>
                <li>• Onboarding guide</li>
              </ul>
            </div>
            <p className="text-sm text-purple-400">Expect a response within 24 hours!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/30 rounded-2xl max-w-md w-full p-8 relative my-8">
          <button onClick={() => setShowRequestForm(false)} className="absolute top-4 right-4 text-purple-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center mb-6">
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${selectedPlan.color} mb-4`}>
              <selectedPlan.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Early Access</h3>
            <p className="text-purple-300">Get started with the <span className="text-white font-semibold">{selectedPlan.name}</span> plan</p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">{selectedPlan.name} Plan</span>
              <span className="text-white font-bold">${billingCycle === 'monthly' ? selectedPlan.priceMonthly : selectedPlan.priceYearly}/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            <div className="text-sm text-purple-300">{selectedPlan.emailsIncluded.toLocaleString()} emails included</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-300">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-purple-300">Work Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-purple-300">Company Name *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Corp"
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-purple-300">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-purple-300">Monthly Email Volume *</label>
              <select
                required
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(e.target.value)}
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
              >
                <option value="">Select volume...</option>
                <option value="0-1000">0 - 1,000 emails</option>
                <option value="1000-5000">1,000 - 5,000 emails</option>
                <option value="5000-10000">5,000 - 10,000 emails</option>
                <option value="10000-25000">10,000 - 25,000 emails</option>
                <option value="25000+">25,000+ emails</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-purple-300">Tell us about your use case</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you looking to achieve with cold email outreach?"
                rows={3}
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-lg transition-all"
            >
              Request Access
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-purple-400">
              <Shield className="w-4 h-4" />
              <span>We'll respond within 24 hours • No spam, ever</span>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="border-b border-purple-500/20 bg-black/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg"><Zap className="w-6 h-6" /></div>
            <div><h1 className="text-xl font-bold">OutreachAI Pro</h1><p className="text-xs text-purple-300">AI-Powered Email Automation</p></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-semibold text-purple-300">🚀 Early Access - Limited Spots Available</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-purple-300 mb-8">Join the waitlist and get 1,000 bonus credits when you sign up</p>

          <div className="flex items-center justify-center gap-4 mb-4">
            <span className={billingCycle === 'monthly' ? 'text-white font-medium' : 'text-purple-400'}>Monthly</span>
            <button onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')} className="relative w-14 h-7 bg-purple-500/30 rounded-full">
              <div className={`absolute top-1 left-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-7' : ''}`}></div>
            </button>
            <span className={billingCycle === 'yearly' ? 'text-white font-medium' : 'text-purple-400'}>Yearly</span>
            {billingCycle === 'yearly' && <span className="bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full font-medium">Save 20%</span>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div key={plan.id} className={`bg-white/5 backdrop-blur border rounded-2xl p-6 relative transition-transform hover:scale-105 ${plan.popular ? 'border-purple-500 shadow-2xl shadow-purple-500/20' : 'border-purple-500/20'}`}>
              {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2"><span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</span></div>}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} mb-4`}><plan.icon className="w-6 h-6" /></div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-purple-300 text-sm mb-4">{plan.description}</p>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">${billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}</span>
                  <span className="text-purple-300">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <p className="text-sm text-purple-400 mt-2">{plan.emailsIncluded.toLocaleString()} emails included</p>
              </div>
              <button onClick={() => handleSelectPlan(plan)} className={`w-full py-3 rounded-lg font-semibold mb-6 transition-all ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-purple-500/30'}`}>Request Early Access</button>
              <div className="space-y-2">{plan.features.map((feature) => <div key={feature} className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-sm text-purple-200">{feature}</span></div>)}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur border border-purple-500/20 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Businesses Choose OutreachAI Pro</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center"><div className="text-4xl font-bold text-purple-400 mb-2">340%</div><div className="text-sm text-purple-300">Average Reply Rate Increase</div></div>
            <div className="text-center"><div className="text-4xl font-bold text-green-400 mb-2">98.7%</div><div className="text-sm text-purple-300">Inbox Delivery Rate</div></div>
            <div className="text-center"><div className="text-4xl font-bold text-pink-400 mb-2">24hrs</div><div className="text-sm text-purple-300">Average Onboarding Time</div></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto space-y-4 text-left">
            {[
              { q: 'How does early access work?', a: 'Request access above. We\'ll email you within 24 hours with login credentials and a payment link. Once paid, you\'re instantly activated!' },
              { q: 'Can I change plans later?', a: 'Absolutely! Upgrade or downgrade anytime. Changes take effect immediately.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and can issue invoices for annual plans.' },
              { q: 'Is there a setup fee?', a: 'No setup fees! Just your monthly or annual subscription.' }
            ].map((faq) => (
              <div key={faq.q} className="bg-white/5 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-white">{faq.q}</h4>
                <p className="text-sm text-purple-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RequestAccessModal />
    </div>
  );
}

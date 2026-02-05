 import { useNavigate } from 'react-router-dom';
 import { ArrowLeft } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import logo from '@/assets/logo.png';
 
 const PrivacyPolicy = () => {
   const navigate = useNavigate();
 
   return (
     <div className="min-h-screen bg-background">
       {/* Header */}
       <header className="px-4 py-4 border-b border-border bg-card/50">
         <div className="max-w-4xl mx-auto flex items-center gap-4">
           <Button 
             variant="ghost" 
             size="icon" 
             onClick={() => navigate('/')}
             className="shrink-0"
           >
             <ArrowLeft className="w-5 h-5" />
           </Button>
           <div className="flex items-center gap-2">
             <img src={logo} alt="AgroGenius AI" className="w-8 h-8 rounded-full" />
             <span className="font-semibold text-foreground">AgroGenius AI</span>
           </div>
         </div>
       </header>
 
       {/* Content */}
       <main className="px-4 py-8 md:py-12">
         <div className="max-w-3xl mx-auto">
           <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
             Privacy Policy
           </h1>
           <p className="text-sm text-muted-foreground mb-8">
             Last updated: February 2025
           </p>
 
           <div className="prose prose-sm md:prose-base max-w-none space-y-6">
             <section>
               <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
               <p className="text-muted-foreground leading-relaxed">
                 Welcome to AgroGenius AI. We respect your privacy and are committed to protecting your personal data. 
                 This privacy policy explains how we collect, use, and safeguard your information when you use our 
                 mobile application and services.
               </p>
             </section>
 
             <section>
               <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
               <p className="text-muted-foreground leading-relaxed mb-3">
                 We may collect the following types of information:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
                 <li><strong>Personal Information:</strong> Name, email address, phone number, and location data when you register or use our services.</li>
                 <li><strong>Farm Data:</strong> Information about your crops, soil conditions, and farming practices that you provide to receive personalized recommendations.</li>
                 <li><strong>Device Information:</strong> Device type, operating system, and app usage statistics to improve our services.</li>
                 <li><strong>Location Data:</strong> With your permission, we collect location data to provide weather forecasts and location-specific agricultural advice.</li>
               </ul>
             </section>
 
             <section>
               <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
               <p className="text-muted-foreground leading-relaxed mb-3">
                 We use the collected information for:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
                 <li>Providing personalized crop recommendations and farming advice</li>
                 <li>Sending weather alerts and pest/disease notifications</li>
                 <li>Improving our AI models and services</li>
                 <li>Communicating updates about government schemes and market prices</li>
                 <li>Customer support and responding to your inquiries</li>
               </ul>
             </section>
 
             <section>
               <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Security</h2>
               <p className="text-muted-foreground leading-relaxed">
                 We implement industry-standard security measures to protect your personal information. 
                 Your data is encrypted during transmission and stored securely on our servers. 
                 However, no method of transmission over the internet is 100% secure, and we cannot 
                 guarantee absolute security.
               </p>
             </section>
 
             <section>
               <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Sharing</h2>
               <p className="text-muted-foreground leading-relaxed">
                 We do not sell your personal information to third parties. We may share your data with:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2 mt-3">
                 <li>Service providers who assist in operating our platform</li>
                 <li>Government authorities when required by law</li>
                 <li>Partners for agricultural research (anonymized data only)</li>
               </ul>
             </section>
 
             <section>
               <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
               <p className="text-muted-foreground leading-relaxed mb-3">
                 You have the right to:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
                 <li>Access and download your personal data</li>
                 <li>Correct inaccurate information</li>
                 <li>Delete your account and associated data</li>
                 <li>Opt-out of marketing communications</li>
                 <li>Withdraw consent for location tracking</li>
               </ul>
             </section>
 
             <section>
               <h2 className="text-xl font-semibold text-foreground mb-3">7. Cookies and Tracking</h2>
               <p className="text-muted-foreground leading-relaxed">
                 We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                 and deliver personalized content. You can manage cookie preferences through your browser settings.
               </p>
             </section>
 
             <section>
               <h2 className="text-xl font-semibold text-foreground mb-3">8. Children's Privacy</h2>
               <p className="text-muted-foreground leading-relaxed">
                 Our services are not intended for children under 13 years of age. We do not knowingly 
                 collect personal information from children. If you believe we have collected data from 
                 a child, please contact us immediately.
               </p>
             </section>
 
             <section>
               <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
               <p className="text-muted-foreground leading-relaxed">
                 We may update this privacy policy from time to time. We will notify you of any significant 
                 changes through the app or via email. Your continued use of our services after such changes 
                 constitutes acceptance of the updated policy.
               </p>
             </section>
 
             <section>
               <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact Us</h2>
               <p className="text-muted-foreground leading-relaxed">
                 If you have any questions about this privacy policy or our data practices, please contact us at:
               </p>
               <p className="text-primary font-medium mt-2">
                 <a href="mailto:agrogeniusai@gmail.com" className="hover:underline">
                   agrogeniusai@gmail.com
                 </a>
               </p>
             </section>
           </div>
         </div>
       </main>
 
       {/* Footer */}
       <footer className="px-4 py-6 border-t border-border">
         <div className="max-w-4xl mx-auto text-center">
           <p className="text-sm text-muted-foreground">
             © 2025 AgroGenius AI. All rights reserved.
           </p>
         </div>
       </footer>
     </div>
   );
 };
 
 export default PrivacyPolicy;
import PremiumBanner from '@/components/PremiumBanner';

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center max-w-md w-full space-y-6">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Your Blank App</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
        <PremiumBanner variant="full" />
      </div>
    </div>
  );
};

export default Index;

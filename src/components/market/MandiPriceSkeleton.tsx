import { Skeleton } from '@/components/ui/skeleton';

const MandiPriceSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl p-4 shadow-sm border">
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-16 w-full rounded-xl mb-3" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
          </div>
        </div>
      ))}
    </>
  );
};

export default MandiPriceSkeleton;

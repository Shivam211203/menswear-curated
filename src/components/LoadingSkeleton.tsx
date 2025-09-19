export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl shadow-soft overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="aspect-[3/4] bg-muted" />
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Brand and category */}
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-16" />
              <div className="h-4 bg-muted rounded w-12" />
            </div>
            
            {/* Product name */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
            
            {/* Price */}
            <div className="flex gap-2">
              <div className="h-5 bg-muted rounded w-20" />
              <div className="h-5 bg-muted rounded w-16" />
            </div>
            
            {/* Size options */}
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-6 bg-muted rounded w-8" />
              ))}
            </div>
            
            {/* Color options */}
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-6 bg-muted rounded w-12" />
              ))}
            </div>
            
            {/* Add to cart button */}
            <div className="h-10 bg-muted rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-muted" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-muted rounded w-16" />
          <div className="h-4 bg-muted rounded w-12" />
        </div>
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-5 bg-muted rounded w-20" />
        <div className="h-10 bg-muted rounded w-full" />
      </div>
    </div>
  );
};

export const CartItemSkeleton = () => {
  return (
    <div className="flex gap-4 p-4 border border-border rounded-lg bg-card animate-pulse">
      <div className="w-16 h-20 bg-muted rounded-md" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-5 bg-muted rounded w-8" />
          <div className="h-5 bg-muted rounded w-12" />
        </div>
        <div className="h-4 bg-muted rounded w-16" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-6 w-6 bg-muted rounded" />
        <div className="h-6 w-16 bg-muted rounded" />
      </div>
    </div>
  );
};
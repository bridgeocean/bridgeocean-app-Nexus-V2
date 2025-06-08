import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">John Doe moved to Interview stage</p>
          <p className="text-sm text-muted-foreground">Interview scheduled for June 8, 2025</p>
        </div>
        <div className="ml-auto font-medium text-xs text-muted-foreground">Just now</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sarah Davis completed document submission</p>
          <p className="text-sm text-muted-foreground">All required documents received</p>
        </div>
        <div className="ml-auto font-medium text-xs text-muted-foreground">2 hours ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>RJ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Robert Johnson passed screening</p>
          <p className="text-sm text-muted-foreground">Ready for selection stage</p>
        </div>
        <div className="ml-auto font-medium text-xs text-muted-foreground">5 hours ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Maria Lopez completed onboarding</p>
          <p className="text-sm text-muted-foreground">Contract signed and keys collected</p>
        </div>
        <div className="ml-auto font-medium text-xs text-muted-foreground">Yesterday</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>DW</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">David Wilson submitted application</p>
          <p className="text-sm text-muted-foreground">New candidate entered screening</p>
        </div>
        <div className="ml-auto font-medium text-xs text-muted-foreground">Yesterday</div>
      </div>
    </div>
  )
}

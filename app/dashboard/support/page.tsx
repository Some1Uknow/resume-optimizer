import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HelpAndSupport() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Help & Support</h2>
      <Card>
        <CardHeader>
          <CardTitle>Need Assistance?</CardTitle>
          <CardDescription>Find answers to common questions or contact our support team.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Help and support content will go here.</p>
        </CardContent>
      </Card>
    </div>
  )
}


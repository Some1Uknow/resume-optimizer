import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Settings() {
  return (
    <div className="space-y-6 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Settings
        </h2>
      </div>

      <Card className="bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Email Notifications</span>
              <Button 
                variant="outline" 
                className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300"
              >
                Toggle
              </Button>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Dark Mode</span>
              <Button 
                variant="outline" 
                className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300"
              >
                Toggle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
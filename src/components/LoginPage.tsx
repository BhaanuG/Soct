import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { GraduationCap, User, BookOpen, Lock, Mail } from "lucide-react";
import { students } from "../data/students";
import { teachers } from "../data/teachers";

interface LoginPageProps {
  onLogin: (userType: 'student' | 'lecturer', userData: any) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [studentCredentials, setStudentCredentials] = useState({ id: "", password: "" });
  const [lecturerCredentials, setLecturerCredentials] = useState({ id: "", password: "" });
  const [studentError, setStudentError] = useState("");
  const [lecturerError, setLecturerError] = useState("");

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError("");
    
    const student = students.find(
      s => s.id === studentCredentials.id && s.password === studentCredentials.password
    );
    
    if (student) {
      onLogin('student', student);
    } else {
      setStudentError("Invalid Student ID or password");
    }
  };

  const handleLecturerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLecturerError("");
    
    const lecturer = teachers.find(
      l => l.id === lecturerCredentials.id && l.password === lecturerCredentials.password
    );
    
    if (lecturer) {
      onLogin('lecturer', lecturer);
    } else {
      setLecturerError("Invalid Teacher ID or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a1f2e] to-[#1a3a3a] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-2xl">OutcomeTracker</h1>
          </div>
          <p className="text-muted-foreground">Computer Science Learning Management</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Student
            </TabsTrigger>
            <TabsTrigger value="lecturer" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Lecturer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="mt-4">
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-id">Student ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="student-id"
                    type="text"
                    placeholder="1234500001"
                    className="pl-10"
                    value={studentCredentials.id}
                    onChange={(e) => setStudentCredentials({...studentCredentials, id: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={studentCredentials.password}
                    onChange={(e) => setStudentCredentials({...studentCredentials, password: e.target.value})}
                    required
                  />
                </div>
              </div>
              {studentError && (
                <p className="text-sm text-destructive">{studentError}</p>
              )}
              <Button type="submit" className="w-full">
                Sign In as Student
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="lecturer" className="mt-4">
            <form onSubmit={handleLecturerLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lecturer-id">Teacher ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lecturer-id"
                    type="text"
                    placeholder="20001"
                    className="pl-10"
                    value={lecturerCredentials.id}
                    onChange={(e) => setLecturerCredentials({...lecturerCredentials, id: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lecturer-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lecturer-password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={lecturerCredentials.password}
                    onChange={(e) => setLecturerCredentials({...lecturerCredentials, password: e.target.value})}
                    required
                  />
                </div>
              </div>
              {lecturerError && (
                <p className="text-sm text-destructive">{lecturerError}</p>
              )}
              <Button type="submit" className="w-full">
                Sign In as Lecturer
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
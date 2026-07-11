"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ChevronLeft, ChevronRight, Handshake, Palette, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import SocialButton from "@/components/ui/social-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { userStore } from "@/lib/stores/user-store"
import type { UserRole } from "@/types/auth"

const LoginForm = ({ onError, users }: any) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: any) => {
    e.preventDefault()
    onError("")

    if (!email || !password) {
      onError("Veuillez remplir tous les champs.")
      return
    }

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    )

    if (user) {
      userStore.login(user.roles || ["consommateur"], email)
      router.push("/dashboard")
    } else {
      onError("Email ou mot de passe incorrect.")
    }
  }

  return (
    <form onSubmit={handleLogin} className="text-white space-y-6 mt-6">
      <div className="text-white space-y-2">
        <Label htmlFor="loginEmail" className="text-white font-light tracking-wide text-md">
          Email
        </Label>
        <Input
          id="loginEmail"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-white border-gray-800 focus:border-white font-light"
        />
      </div>
      <div className="text-white space-y-2">
        <Label htmlFor="loginPassword" className="text-white font-light tracking-wide text-md">
          Mot de passe
        </Label>
        <Input
          id="loginPassword"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-white border-gray-800 focus:border-white font-light"
        />
      </div>
      <Button
        type="submit"
        className="text-black w-full bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3"
      >
        Se connecter
      </Button>
      <p className="text-white text-center text-md mt-6 font-light">
        Test : <span className="text-white font-semibold">test@example.com</span> / <span className="text-white font-semibold">password123</span>
      </p>
    </form>
  )
}

const RoleSelectionStep = ({ roles, setRoles, onNext }: any) => {
  const toggleRole = (role: UserRole) => {
    setRoles((prev: UserRole[]) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    )
  }

  return (
    <div className="text-white space-y-6">
      <div className="text-white space-y-4">
        <Label className="text-white font-light tracking-wide text-md">
          Votre profil : * <span className="text-gray-400 text-sm">(sélectionnez au moins un)</span>
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => toggleRole("createur")}
            className={`p-6 rounded-lg border text-center transition-all ${
              roles.includes("createur")
                ? "border-white bg-white/10"
                : "border-gray-700 bg-transparent hover:border-gray-500"
            }`}
          >
            <Palette className="h-8 w-8 mx-auto mb-3" />
            <p className="font-light text-sm tracking-wide">Créateur de mode</p>
            <p className="text-gray-400 text-xs mt-1 font-light">Design, création, vente</p>
          </button>
          <button
            type="button"
            onClick={() => toggleRole("consommateur")}
            className={`p-6 rounded-lg border text-center transition-all ${
              roles.includes("consommateur")
                ? "border-white bg-white/10"
                : "border-gray-700 bg-transparent hover:border-gray-500"
            }`}
          >
            <ShoppingBag className="h-8 w-8 mx-auto mb-3" />
            <p className="font-light text-sm tracking-wide">Passionné de mode</p>
            <p className="text-gray-400 text-xs mt-1 font-light">Achat, exploration, inspiration</p>
          </button>
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={roles.length === 0}
        className="text-black w-full bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3 disabled:bg-gray-200"
      >
        Suivant <ChevronRight className="text-black ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

const PersonalInfoStep = ({ 
  roles,
  firstName, setFirstName,
  lastName, setLastName,
  brandName, setBrandName,
  speciality, setSpeciality,
  onNext, onPrev 
}: any) => {
  const handleNext = () => {
    if (!firstName || !lastName) return
    if (roles.includes("createur") && !brandName) return
    onNext()
  }

  const isValid = () => {
    if (!firstName || !lastName) return false
    if (roles.includes("createur") && !brandName) return false
    return true
  }

  return (
    <div className="text-white space-y-6">
      <div className="text-white grid grid-cols-2 gap-4">
        <div className="text-white space-y-2">
          <Label htmlFor="firstName" className="text-white font-light tracking-wide text-md">
            Prénom *
          </Label>
          <Input
            id="firstName"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>
        <div className="text-white space-y-2">
          <Label htmlFor="lastName" className="text-white font-light tracking-wide text-md">
            Nom *
          </Label>
          <Input
            id="lastName"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>
      </div>

      {roles.includes("createur") && (
        <div className="text-white space-y-2">
          <Label htmlFor="brandName" className="text-white font-light tracking-wide text-md">
            Nom de marque *
          </Label>
          <Input
            id="brandName"
            placeholder="Votre marque"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>
      )}

      <div className="text-white flex gap-3">
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          className="text-black flex-1 bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3"
        >
          <ChevronLeft className="text-black mr-2 h-4 w-4" /> Précédent
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid()}
          className="text-black flex-1 bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3 disabled:bg-gray-200"
        >
          Suivant <ChevronRight className="text-black ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

const AccountCreationStep = ({ 
  email, setEmail,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  onSubmit, onPrev, isLoading 
}: any) => {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(e)
  }

  const isValid = () => {
    return email && password && confirmPassword && password === confirmPassword
  }

  return (
    <div className="text-white space-y-6">
      <form onSubmit={handleSubmit} className="text-white space-y-4">
        <div className="text-white space-y-2">
          <Label htmlFor="signupEmail" className="text-white font-light tracking-wide text-md">
            Email *
          </Label>
          <Input
            id="signupEmail"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>

        <div className="text-white space-y-2">
          <Label htmlFor="signupPassword" className="text-white font-light tracking-wide text-md">
            Mot de passe *
          </Label>
          <Input
            id="signupPassword"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>

        <div className="text-white space-y-2">
          <Label htmlFor="confirmPassword" className="text-white font-light tracking-wide text-md">
            Confirmer le mot de passe *
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>

        <div className="text-white flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onPrev}
            variant="outline"
            className="text-black flex-1 bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3"
          >
            <ChevronLeft className="text-black mr-2 h-4 w-4" /> Précédent
          </Button>
          <Button
            type="submit"
            disabled={!isValid() || isLoading}
            className="text-black flex-1 bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3 disabled:bg-gray-200"
          >
            {isLoading ? "Création..." : "Créer le compte"}
          </Button>
        </div>
      </form>
    </div>
  )
}

const SignupForm = ({ onError, onSignup }: any) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [roles, setRoles] = useState<UserRole[]>([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [brandName, setBrandName] = useState("")
  const [speciality, setSpeciality] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onError("")
    setIsLoading(true)

    if (password !== confirmPassword) {
      onError("Les mots de passe ne correspondent pas.")
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      setIsLoading(false)
      onSignup({
        email,
        password,
        roles,
        firstName,
        lastName,
        brandName,
      })
    }, 2000)
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="text-white mt-6">
      {currentStep === 1 && (
        <RoleSelectionStep
          roles={roles}
          setRoles={setRoles}
          onNext={nextStep}
        />
      )}

      {currentStep === 2 && (
        <PersonalInfoStep
          roles={roles}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          brandName={brandName}
          setBrandName={setBrandName}
          speciality={speciality}
          setSpeciality={setSpeciality}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}

      {currentStep === 3 && (
        <AccountCreationStep
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onSubmit={handleSubmit}
          onPrev={prevStep}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default function Authentication() {
  const [error, setError] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const [users, setUsers] = useState([
    {
      email: "test@example.com",
      password: "password123",
      roles: ["createur", "consommateur"] as UserRole[],
    },
  ])

  const handleSignup = (newUser: any) => {
    if (users.some((u) => u.email === newUser.email)) {
      setError("Cet email est déjà utilisé.")
      return
    }
    setUsers((prev) => [...prev, newUser])
    setError("")
    setShowSuccessAlert(true)
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 5000)
  }

  return (
    <div className="text-white min-h-screen bg-gradient-to-r from-black/90 to-black">
      <div className="text-white relative z-10 min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-white/95 relative overflow-hidden">
          <Image
            src="/img/login2.png"
            alt="Login Fashion"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative text-white flex flex-col md:h-screen overflow-y-scroll md:py-14 items-center justify-between">
          {showSuccessAlert && (
            <Alert className="fixed mx-5 bottom-6 md:right-0 max-w-fit bg-gray-800 shadow-lg shadow-black border-0 animate-fade-in duration-75 z-10">
              <AlertTitle>Inscription réussie !</AlertTitle>
              <AlertDescription>
                Vous pouvez maintenant vous connecter.
              </AlertDescription>
            </Alert>
          )}
          <Link className="text-white mt-20 absolute -top-14 md:-top-1 left-0" href="/">
            <Button
              size="lg"
              className="bg-gray-800 hover:bg-gray-900 focus:ring-gray-700"
            >
              <ArrowLeft className="text-white h-20 w-20" />
            </Button>
          </Link>
          <div className="text-white w-full max-w-lg">
            <Card className="text-white border-0 bg-transparent overflow-hidden pt-2 md:pt-1">
              <CardHeader className="text-white text-center pb-2">
                <div className="w-full flex justify-center pb-5">
                  <Link href="/" className="text-2xl font-light tracking-[0.2em] serif-font z-10">
                    <Handshake size={32} color="white" />
                  </Link>
                </div>
                <CardTitle className="text-white text-4xl md:text-4xl font-extralight tracking-[0.2em] font-serif">
                  Rejoignez-nous
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white px-12 py-2">
                <Tabs defaultValue="login" className="text-white w-full">
                  <TabsList className="text-white grid w-full grid-cols-2 p-1 mb-8">
                    <TabsTrigger 
                      value="login" 
                      className="
                      text-white font-2xl font-extralight tracking-[0.2em] py-5 data-[state=active]:border-b data-[state=active]:border-white/80 transition-all duration-200"
                    >
                      CONNEXION
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup"
                      className="text-white font-5xl font-extralight tracking-[0.2em] py-5 data-[state=active]:border-b data-[state=active]:border-white/80 transition-all duration-200"
                    >
                      INSCRIPTION
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="text-white my-16">
                    <LoginForm onError={setError} users={users} />
                  </TabsContent>
                  
                  <TabsContent value="signup" className="text-white my-16">
                    <SignupForm onError={setError} onSignup={handleSignup} />
                  </TabsContent>
                </Tabs>
                
                {error && (
                  <div className="text-white mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm text-center font-lg">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        
          <div className="space-x-10 mb-6">
            <SocialButton provider="facebook" variant="login" onClick={()=>{}}/>
            <SocialButton provider="google" variant="login" onClick={()=>{}} />
            <SocialButton provider="other" variant="login" onClick={()=>{}} />
          </div>

        </div>
      </div>

      <div className="text-white lg:hidden fixed inset-0 pointer-events-none overflow-hidden">
        <div className="text-white absolute top-1/4 right-4 w-16 h-16 bg-gray-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="text-white absolute bottom-1/4 left-4 w-12 h-12 bg-gray-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>
    </div>
  )
}

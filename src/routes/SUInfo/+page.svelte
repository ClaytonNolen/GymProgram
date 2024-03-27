<script>
    import image1 from '$lib/assets/Ab Bench.png';
    import image2 from '$lib/assets/Abdominal Crunch.png'
    import image3 from '$lib/assets/Back Extension.png'
    import image4 from '$lib/assets/Bench Press.png'
    import image5 from '$lib/assets/Bicep Curl.png'
    import image6 from '$lib/assets/Cable Machine.png'
    import image7 from '$lib/assets/Calf Raise.png'
    import image8 from '$lib/assets/Chest Press.png'
    import image9 from '$lib/assets/Glute Machine.png'
    import image10 from '$lib/assets/Hip Adductor_Abductor.png'
    import image11 from '$lib/assets/Lat Pull Down.png'
    import image12 from '$lib/assets/Lateral Raise.png'
    import image13 from '$lib/assets/Leg Extension.png'
    import image14 from '$lib/assets/Leg Press.png'
    import image15 from '$lib/assets/Other Equipment.png'
    import image16 from '$lib/assets/Pec Fly.png'
    import image17 from '$lib/assets/Plated Chest Press.png'
    import image18 from '$lib/assets/Plated Leg Press.png'
    import image19 from '$lib/assets/Rotary Torso.png'
    import image20 from '$lib/assets/Seated Leg Curl.png'
    import image21 from '$lib/assets/Seated Row.png'
    import image22 from '$lib/assets/Shoulder Press.png'
    import image23 from '$lib/assets/Smith Machine.png'
    import image24 from '$lib/assets/Squat Rack.png'
    import image25 from '$lib/assets/Triceps Press.png'
</script>

<h1 class="mt-4 mb-4 text-white">
    The Robertson Gym Equipment
</h1>

<div class="text-white mx-4">
    <row class="flex">
        <columnLeft>
            <h1>
                Ab Crunch
            </h1>
            <!--description from:
            https://www.bodybuilding.com/exercises/ab-crunch-machine#:~:text=The%20machine%20crunch%20is%20a,curl%20up%20torward%20the%20torso.-->
            <div>
                DESCRIPTION: sit upright in the machine. Curl your torso down toward your legs.
            </div>
            <div>
                MUSCLE GROUP: rectus abdominis, internal and external obliques, transversus abdominis, iliopsoas and rectus femoris.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image2} alt="ab crunch" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Back Extension
            </h1>
            <!--description from: 
                https://steelsupplements.com/blogs/steel-blog/how-to-do-back-extensions-form-benefits#:~:text=Also%20known%20as%20hyperextension%2C%20the,spine%20through%20flexion%20and%20extension.&text=This%20fancy%20equipment%20helps%20angle,target%20the%20lower%20back%20muscles.-->
            <div>
                DESCRIPTION: Adjust the machine to a 45-degree angle so your hips aligns with, or are barely above, the cushion pad.
                Your feet should be hip-width apart and held in place by the support behind your ankles.
                Keep your neck neutral and your spine straight. Bend at your hips until your torso is perpendicular to the floor;
                this is the starting position. Contract your back muscles until your body is in a straight line. 
                Slowly lower yourself back to the starting position; this is one rep. 
            </div>
            <div>
                MUSCLE GROUP: erector spinae, gluteus maximus, hamstrings.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image3} alt="back extension" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Bench Press
            </h1>
            <div>
                DESCRIPTION: Lay flat on bench with your eyes directly under the bar. Position your hands on the bar; 
                a wider grip will work out your pecs more while a closer grip will work your triceps. 
                Position your feet either flat on the floor or slightly behind your knees to create tension in your legs.
                You can have a slight curve in your back. Remove the bar from rack and position it above your chest.
                Lower the bar until it touches your chest, then extend until your arms are straight. 
            </div>
            <div>
                MUSCLE GROUP: pectoralis major, triceps brachii, anterior deltoid, serratus anterior muscle, biceps brachialis.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image4} alt="bench press" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Bicep Curl
            </h1>
            <!--description from: 
                https://www.exercise.com/exercises/machine-bicep-curl/-->
            <div>
                DESCRIPTION: Move arms extended behind the handles and curl 
                the handles up to your shoulders and back down.
            </div>
            <div>
                MUSCLE GROUP: biceps brachii, brachialis and brachioradialis.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image5} alt="bicep curl" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Calf Raise
            </h1>
            <div>
                DESCRIPTION: Place your toes on the pegs and your thighs under the pads. Flex your feet as if standing on your
                tip-toes, and remove the stopper between you and the weight. Lower your heels as far as you can, then raise them 
                to complete a single rep. When finished, lift the weight and put the stopper back in place.
            </div>
            <div>
                MUSCLE GROUP:  triceps surae, tibialis posterior, and peroneal muscles.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image7} alt="calf raise" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Chest Press
            </h1>
            <div>
                DESCRIPTION: Sit in the chair with your back firmly against the chair. Grab the handles and extend your arms
                until they are straigh. Bend your arms until they are at a 90 degree angle. This is one rep. 
            </div>
            <div>
                MUSCLE GROUP: pectoralis major, anterior deltoids, triceps brachii, biceps brachii.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image8} alt="chest press" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Glute Machine
            </h1>
            <div>
                DESCRIPTION: Stand on the bottom of the machine and place your arms on the pads and 
                put one leg at a time of the foot pad. Extend your leg and back while keeping the rest 
                of the body still
            </div>
            <div>
                MUSCLE GROUP: gluteal maximus, gluteal medius, gluteal minimus.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image9} alt="glute machine" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Hip Adductor_Abductor
            </h1>
            <div>
                DESCRIPTION: Either place the inner pads facing towards each other 
                or aways from each other. When facing each other, place the legs on the inside
                against each pad and push out to move the pads away. In the other pad position, 
                push with your legs inward to move the pads closer to each other.
            </div>
            <div>
                MUSCLE GROUP: tensor fasciae latae, gluteus medius, gluteus minimus, gluteus maximus.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image10} alt="hip adductor/abductor" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Lat Pull Down 
            </h1>
            <div>
                DESCRIPTION: Sit on the chair with your thighs under the roller pads. Grab the handles and pull down until 
                your hands are below your chin. Slowly allow the weight to lift your hands back up to the starting position.
            </div>
            <div>
                MUSCLE GROUP: latissimus dorsi, pectoralis major, rotator cuff, biceps brachii.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image11} alt="lat pull down" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Lateral Raise
            </h1>
            <!--description from: 
                https://workoutlabs.com/exercise-guide/lateral-raise-machine/-->
            <div>
                DESCRIPTION: Grab handles with each hand and have your elbow near the back of the pad. 
                Push out and up with your ams to make them parallel to your shoulders and hold for a second. 
                Then move arms slowly back down.
            </div>
            <div>
                MUSCLE GROUP: lateral deltoid, anterior deltoid, serratus anterior.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image12} alt="lateral raise" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Leg Extension
            </h1>
            <div>
                DESCRIPTION: Postition the back so that your knees are at the edge of the chair. Position the roller pad so that
                it is right above your ankles. Sit firmly in the chair and extend your legs until they are straight. Slowly lower 
                your legs back to the starting position.
            </div>
            <div>
                MUSCLE GROUP: vastus intermedius, rectus femoris, vastus medialis, vastus lateralis.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image13} alt="leg extension" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Leg Press
            </h1>
            <div>
                DESCRIPTION: Adjust the chair so that your legs are at 90 degrees in the staring position. Sit firmly in the chair
                and place your feet on the platform at a slight outward angle. Fully extend your legs and slowly return to starting
                position to complete rep.
            </div>
            <div>
                MUSCLE GROUP: quadriceps muscles, gluteal muscles, hamstrings, calves.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image14} alt="leg press" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Pec Fly
            </h1>
            <div>
                DESCRIPTION: Place arms behind the pads with elbows parallel with your shoulders. 
                Grab the handles and move your arms in until they are in front of your shoulders. 
                Try to keep your upper back on the machine and return back to the staring position slowly.
            </div>
            <div>
                MUSCLE GROUP: pectoralis major, pectoralis minor, deltoids, triceps, biceps.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image16} alt="pec fly" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Plated Chest Press
            </h1>
            <div>
                DESCRIPTION: To add weight, place plates on each bar on each side and make sure the weight 
                is the same on each side. Adjust the seat to where when your arms are grabbing the handles, 
                they are on the same level as your upper chest. Grab either side of the handles to workout 
                different parts of the chest. Push on each handle and extend the handles as far as you go and 
                return slowly to the starting position. During the motion try to always have your hands in
                the same position on both sides.

            </div>
            <div>
                MUSCLE GROUP: pectoralis major, anterior deltoids, triceps brachii, biceps brachii.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image17} alt="plated chest press" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Plated Leg Press
            </h1>
            <div>
                DESCRIPTION: To add weight, place plates on each bar on each side and make sure the weight 
                is the same on each side. Adjust the starting position of the black foot rest 
                to where your legs are at 90 degrees. To move the weight, push it slightly up and 
                move the handles out to where they are not stopping the sliding weight. Extend your legs and move 
                back to the starting position to complete a rep. Once completed with a set, 
                move the handle back in to where it stops the weight.
            </div>
            <div>
                MUSCLE GROUP: quadriceps muscles, gluteal muscles, hamstrings, calves.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image18} alt="plated leg press" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Rotary Torso
            </h1>
            <div>
                DESCRIPTION: 
            </div>
            <div>
                MUSCLE GROUP: obliques, quadratus lumborum.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image19} alt="rotary torso" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Seated Leg Curl
            </h1>
            <div>
                DESCRIPTION:
            </div>
            <div>
                MUSCLE GROUP: hamstrings, glutes, hip flexors.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image20} alt="seated leg curl" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Seated Row
            </h1>
            <div>
                DESCRIPTION:
            </div>
            <div>
                MUSCLE GROUP: lats, traps, rear delts, and rhomboids.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image21} alt="seated row" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Shoulder Press
            </h1>
            <div>
                DESCRIPTION:
            </div>
            <div>
                MUSCLE GROUP: deltoids, triceps, trapezius and pecs.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image22} alt="shoulder press" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Smith Machine
            </h1>
            <div>
                DESCRIPTION:
            </div>
            <div>
                MUSCLE GROUP:
            </div>
        </columnLeft>
        <columnRight>
            <img src={image23} alt="smith machine" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
    <row class="flex">
        <columnLeft>
            <h1>
                Tricep Press
            </h1>
            <div>
                DESCRIPTION:
            </div>
            <div>
                MUSCLE GROUP: triceps, pectoral, and deltoids.
            </div>
        </columnLeft>
        <columnRight>
            <img src={image25} alt="tricep press" class="mx-auto w-1/1 lg:w-1/1" />
        </columnRight>
    </row>
</div>

<style>
    h1 {
        font-size: 24px;
        text-align: center;
    }

    div {
        font-size: 24px;
        margin-top: 10px;
    }

    :global(columnLeft) {
        border: double;
        border: 4;
        border: white -500px;
        width: 400%;
    }

    :global(columnRight) {
        border: double;
        border: 4;
        border: white -500px;
    }

</style>